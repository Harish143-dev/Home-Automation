import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendCareerEmail } from '../services/emailService';
import { careerApplicationSchema } from '../schemas';

export const createCareerApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = careerApplicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, errors: parsed.error.format() });
    }

    const { name, email, phone, experience, position, message } = parsed.data;
    
    // If a file was uploaded via multer, use its path. Otherwise fallback to the body's resumeUrl
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : parsed.data.resumeUrl || null;

    const application = await prisma.careerApplication.create({
      data: {
        name,
        email,
        phone: phone || null,
        experience,
        position,
        message: message || null,
        resumeUrl,
      },
    });

    sendCareerEmail({ name, email, phone, experience, position, message, resumeUrl }).catch((err) => {
      console.error('[EmailService] Async career application notification failed:', err);
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

export const getCareerApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applications = await prisma.careerApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
};

export const deleteCareerApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await prisma.careerApplication.delete({
      where: { id },
    });
    res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};
