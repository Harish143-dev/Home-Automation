import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const createCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, location, type, experience, department, isActive } = req.body;
    const career = await prisma.career.create({
      data: {
        title,
        description,
        location: location || 'New Delhi, India',
        type: type || 'Full Time',
        experience: experience || 'Open Opportunity',
        department: department || 'Engineering & Operations',
        isActive: isActive !== undefined ? (isActive === true || isActive === 'true') : true,
      } as any,
    });
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const getCareers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const careers = await prisma.career.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    next(error);
  }
};

export const getCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const career = await prisma.career.findUnique({ where: { id } });
    if (!career) return res.status(404).json({ success: false, error: 'Career not found' });
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const updateCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { title, description, location, type, experience, department, isActive } = req.body;
    
    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (description !== undefined) dataToUpdate.description = description;
    if (location !== undefined) dataToUpdate.location = location;
    if (type !== undefined) dataToUpdate.type = type;
    if (experience !== undefined) dataToUpdate.experience = experience;
    if (department !== undefined) dataToUpdate.department = department;
    if (isActive !== undefined) dataToUpdate.isActive = (isActive === true || isActive === 'true');

    const career = await prisma.career.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const deleteCareer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await prisma.career.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Career deleted successfully' });
  } catch (error) {
    next(error);
  }
};
