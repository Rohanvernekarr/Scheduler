import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('[GlobalErrorHandler]', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      issues: err.issues
    });
  }

  // Handle specific Prisma errors (e.g. Unique constraint)
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'A record with this information already exists.'
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}
