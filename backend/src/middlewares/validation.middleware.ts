import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { validationResult, ValidationChain } from 'express-validator';

export const validateSchema = (schema: ZodSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: error.errors
                });
                return;
            }
            next(error);
        }
    };
};

export const validate = (validations: ValidationChain[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                next();
                return;
            }

            res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        } catch (error) {
            next(error);
        }
    };
};