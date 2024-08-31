import { Request, Response, NextFunction } from 'express';
import { handleError } from '../utils/handleError';

export function errorHandlerMiddleware(error: unknown, req: Request, res: Response, next: NextFunction): void {
    handleError(error, res);
}
