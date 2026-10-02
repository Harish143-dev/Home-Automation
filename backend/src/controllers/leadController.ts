import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { sendLeadEmail } from '../services/emailService';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, inquiryType, message } = req.body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        inquiryType: inquiryType || 'General',
        message,
      },
    });

    // Fire email sending asynchronously in the background so slow SMTP doesn't delay HTTP response
    sendLeadEmail({ name, email, phone, message, inquiryType }).catch((err) => {
      console.error('[EmailService] Async notification failed:', err);
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await prisma.lead.delete({
      where: { id },
    });
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};
