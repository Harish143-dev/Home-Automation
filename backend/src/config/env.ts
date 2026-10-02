import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters long').default('development_jwt_secret_change_in_production'),
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().default('587').transform((val) => parseInt(val, 10)),
  SMTP_SECURE: z.string().default('false').transform((val) => val === 'true'),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.format());
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

export const env = parsed.success
  ? parsed.data
  : {
      PORT: parseInt(process.env.PORT || '5000', 10),
      NODE_ENV: (process.env.NODE_ENV as any) || 'development',
      DATABASE_URL: process.env.DATABASE_URL || '',
      JWT_SECRET: process.env.JWT_SECRET || 'development_jwt_secret_change_in_production',
      CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001',
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
      SMTP_SECURE: process.env.SMTP_SECURE === 'true',
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    };
