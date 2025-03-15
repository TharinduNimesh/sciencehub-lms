import express from 'express';
import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction } from 'express';
import { authController } from '@/controllers/auth.controller';
import type { SignInRequest } from '@/types/auth.types';
import { validateSchema } from '@/middlewares/validation.middleware';
import { signInSchema } from '@/validations/auth.validation';

const router = express.Router();

// Rate limiting middleware
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: { error: 'Too many login attempts, please try again later' }
});

const signInHandler = async (req: Request<{}, {}, SignInRequest>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await authController.signIn(req, res);
    } catch (error) {
        // Log error for security auditing
        console.error('Sign in error:', {
            timestamp: new Date().toISOString(),
            ip: req.ip,
            email: req.body.email,
            error
        });
        next(error);
    }
};

router.post('/',
    loginLimiter,
    validateSchema(signInSchema),
    signInHandler
);

export { router as signInRouter };