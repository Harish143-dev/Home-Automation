import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, author } = req.body;
    const blog = await prisma.blog.create({
      data: { title, content, author: author || null },
    });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { title, content, author } = req.body;
    const blog = await prisma.blog.update({
      where: { id },
      data: { title, content, author: author || null },
    });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await prisma.blog.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};
