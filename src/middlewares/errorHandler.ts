import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  logger.error('REQUEST_ERROR', {
    status,
    code,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });

  res.status(status).json({
    error: {
      code,
      message: err.message || 'Something went wrong',
    },
  });
}
export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Resource not found',
    },
  });
}