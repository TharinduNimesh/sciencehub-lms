import express from 'express';
import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction } from 'express';
import { authController } from '@/controllers/auth.controller';

const router = express.Router();

// Rate limiting middleware for refresh token
const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 refresh attempts per window
    message: { error: 'Too many refresh attempts, please try again later' }
});

const refreshTokenHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await authController.refreshToken(req, res);
    } catch (error) {
        next(error);
    }
};

router.post('/', refreshLimiter, refreshTokenHandler);

export { router as refreshTokenRouter };