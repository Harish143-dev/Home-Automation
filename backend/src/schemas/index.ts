import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().optional().nullable(),
  inquiryType: z.string().default('General'),
  message: z.string().min(1, 'Message is required'),
});

export const careerApplicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().optional().nullable(),
  experience: z.string().min(1, 'Experience is required'),
  position: z.string().min(1, 'Position is required'),
  message: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Project title must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  imageUrl: z.string().optional().nullable(),
});

export const blogSchema = z.object({
  title: z.string().min(2, 'Blog title must be at least 2 characters'),
  content: z.string().min(10, 'Blog content must be at least 10 characters'),
  author: z.string().optional().nullable(),
});

export const careerSchema = z.object({
  title: z.string().min(2, 'Career title must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  location: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
});
