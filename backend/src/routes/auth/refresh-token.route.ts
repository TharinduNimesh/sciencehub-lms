import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { authController } from '@/controllers/auth.controller';

const router = express.Router();

const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await authController.refreshToken(req, res);
    } catch (error) {
        next(error);
    }
};

router.post('/', refreshTokenHandler);

export { router as refreshTokenRouter };