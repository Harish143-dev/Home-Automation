import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, content, imageUrl, category, author, publishedAt, keyTakeaways } = req.body;
    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : imageUrl || null;
    
    const blog = await prisma.blog.create({
      data: {
        title,
        description: description || null,
        content,
        imageUrl: finalImageUrl,
        category: category || 'Smart Living',
        author: author || 'ATPL Team',
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        keyTakeaways: keyTakeaways || null,
      } as any,
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
    const { title, description, content, imageUrl, category, author, publishedAt, keyTakeaways } = req.body;
    
    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (description !== undefined) dataToUpdate.description = description;
    if (content !== undefined) dataToUpdate.content = content;
    if (category !== undefined) dataToUpdate.category = category;
    if (author !== undefined) dataToUpdate.author = author;
    if (publishedAt !== undefined) dataToUpdate.publishedAt = new Date(publishedAt);
    if (keyTakeaways !== undefined) dataToUpdate.keyTakeaways = keyTakeaways;
    
    if (req.file) {
      dataToUpdate.imageUrl = `/uploads/${req.file.filename}`;
    } else if (imageUrl !== undefined) {
      dataToUpdate.imageUrl = imageUrl;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: dataToUpdate,
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
