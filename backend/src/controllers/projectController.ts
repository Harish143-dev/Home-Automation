import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { projectSchema } from '../schemas';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ success: false, errors: parsed.error.format() });
    
    const { title, description } = parsed.data;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : parsed.data.imageUrl || null;
    
    const project = await prisma.project.create({
      data: { title, description, imageUrl },
    });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ success: false, errors: parsed.error.format() });
    
    const { title, description } = parsed.data;
    const dataToUpdate: any = { title, description };
    
    if (req.file) {
      dataToUpdate.imageUrl = `/uploads/${req.file.filename}`;
    } else if (parsed.data.imageUrl !== undefined) {
      dataToUpdate.imageUrl = parsed.data.imageUrl;
    }
    
    const project = await prisma.project.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await prisma.project.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
