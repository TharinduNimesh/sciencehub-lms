import { Role } from '@prisma/client';
import type { SignInInput } from '@/validations/auth.validation';

export type SignInRequest = SignInInput;

export interface AuthenticatedUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}

export interface AuthSuccess {
    token?: string;
    accessToken: string;
    refreshToken?: string;
    user: AuthenticatedUser;
}

export interface AuthError {
    status: number;
    error: string;
}

export type AuthResult = AuthSuccess | AuthError;