import { z } from 'zod';

const passwordRequirements = {
    minLength: 8,
    maxLength: 100,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
};

export const signInSchema = z.object({
    email: z
        .string()
        .email('Invalid email format')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email contains invalid characters')
        .max(255, 'Email is too long'),
    password: z
        .string()
        .min(passwordRequirements.minLength, `Password must be at least ${passwordRequirements.minLength} characters`)
        .max(passwordRequirements.maxLength, `Password cannot exceed ${passwordRequirements.maxLength} characters`)
        .regex(/[a-z]/, `Password must contain at least ${passwordRequirements.minLowercase} lowercase letter`)
        .regex(/[A-Z]/, `Password must contain at least ${passwordRequirements.minUppercase} uppercase letter`)
        .regex(/[0-9]/, `Password must contain at least ${passwordRequirements.minNumbers} number`)
        .regex(/[^a-zA-Z0-9]/, `Password must contain at least ${passwordRequirements.minSymbols} special character`)
}).strict(); // This will reject any additional properties not defined in the schema

export type SignInInput = z.infer<typeof signInSchema>;