import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { authController } from '@/controllers/auth.controller';
import type { SignInRequest } from '@/types/auth.types';
import { validateSchema } from '@/middlewares/validation.middleware';
import { signInSchema } from '@/validations/auth.validation';

const router = express.Router();

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
    validateSchema(signInSchema),
    signInHandler
);

export { router as signInRouter };