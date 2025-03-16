import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean().optional()
})

export type SignInFormData = z.infer<typeof signInSchema>
