import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendCareerEmail } from '../services/emailService';

export const createCareerApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, experience, position, message, resumeUrl } = req.body;

    const application = await prisma.careerApplication.create({
      data: {
        name,
        email,
        phone: phone || null,
        experience,
        position,
        message: message || null,
        resumeUrl: resumeUrl || null,
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
