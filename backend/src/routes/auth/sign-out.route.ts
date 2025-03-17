import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { authController } from '@/controllers/auth.controller';
import { authenticateToken } from '@/middlewares/auth.middleware';

const router = express.Router();

const signOutHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await authController.signOut(req, res);
    } catch (error) {
        next(error);
    }
};

router.post('/', authenticateToken, signOutHandler);

export { router as signOutRouter };