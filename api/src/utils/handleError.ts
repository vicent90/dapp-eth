import { Response } from 'express';

export function handleError(error: unknown, res: Response): void {
    if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
    } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
}
