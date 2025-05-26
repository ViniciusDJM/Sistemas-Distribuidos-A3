import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { AppError };

export function errorMiddleware(error: Error, request: Request, response: Response): Response {
  // Zod validation errors
  if (error instanceof ZodError) {
    return response.status(400).json({
      error: 'Validation Error',
      message: 'Invalid request data',
      details: error.format(),
    });
  }

  // Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return response.status(409).json({
        error: 'Conflict',
        message: 'Resource already exists with this unique constraint',
      });
    }

    if (error.code === 'P2025') {
      return response.status(404).json({
        error: 'Not Found',
        message: 'Resource not found',
      });
    }
  }

  // Custom app errors
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: error.name,
      message: error.message,
    });
  }

  // Unexpected errors
  console.error(error);
  return response.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
}
