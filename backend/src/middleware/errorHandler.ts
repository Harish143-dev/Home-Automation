import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export class AppError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  // Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  // Prisma unique constraint violation
  if (err?.code === 'P2002') {
    const fields = err.meta?.target || 'field';
    return res.status(409).json({
      success: false,
      error: `A record with this ${Array.isArray(fields) ? fields.join(', ') : fields} already exists.`,
    });
  }

  // Prisma record not found
  if (err?.code === 'P2025') {
    return res.status(404).json({
      success: false,
      error: 'Requested record was not found.',
    });
  }

  // Default internal server error
  const message = env.NODE_ENV === 'production' ? 'An unexpected internal error occurred' : err.message || 'Internal server error';

  res.status(err.status || 500).json({
    success: false,
    error: message,
    ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
