import { prisma } from '@/lib/prisma.lib';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AuthResult } from '@/types/auth.types';
import { auditLog, errorLog } from '@/lib/logger.lib';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets must be configured');
}

export const authService = {
    async signIn(email: string, password: string, clientInfo: { ip: string; userAgent: string }): Promise<AuthResult> {
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                auditLog('sign_in', 'failure', {
                    reason: 'user_not_found',
                    email,
                    ...clientInfo
                });
                return {
                    status: 401,
                    error: 'Invalid credentials'
                };
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                auditLog('sign_in', 'failure', {
                    reason: 'invalid_password',
                    userId: user.id,
                    ...clientInfo
                });
                return {
                    status: 401,
                    error: 'Invalid credentials'
                };
            }

            if (!user.isActive) {
                auditLog('sign_in', 'failure', {
                    reason: 'account_inactive',
                    userId: user.id,
                    ...clientInfo
                });
                return {
                    status: 403,
                    error: 'Account is inactive'
                };
            }

            const accessToken = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                },
                JWT_ACCESS_SECRET,
                { expiresIn: '15m' }
            );

            const refreshToken = jwt.sign(
                {
                    userId: user.id,
                    tokenVersion: user.tokenVersion || 0
                },
                JWT_REFRESH_SECRET,
                { expiresIn: '7d' }
            );

            // Store refresh token
            await prisma.refreshToken.create({
                data: {
                    token: refreshToken,
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    ipAddress: clientInfo.ip,
                    userAgent: clientInfo.userAgent
                }
            });

            auditLog('sign_in', 'success', {
                userId: user.id,
                ...clientInfo
            });

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            };
        } catch (error) {
            errorLog(error as Error, {
                action: 'sign_in',
                ...clientInfo
            });
            return {
                status: 500,
                error: 'Authentication failed'
            };
        }
    },

    async refreshAccessToken(refreshToken: string, clientInfo: { ip: string; userAgent: string }): Promise<AuthResult> {
        try {
            const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
                userId: string;
                tokenVersion: number;
            };

            const user = await prisma.user.findUnique({
                where: { id: payload.userId }
            });

            if (!user || !user.isActive || user.tokenVersion !== payload.tokenVersion) {
                auditLog('refresh_token', 'failure', {
                    reason: 'invalid_token',
                    userId: payload.userId,
                    ...clientInfo
                });
                return {
                    status: 401,
                    error: 'Invalid refresh token'
                };
            }

            const storedToken = await prisma.refreshToken.findFirst({
                where: {
                    token: refreshToken,
                    userId: user.id,
                    revoked: false,
                    expiresAt: { gt: new Date() }
                }
            });

            if (!storedToken) {
                auditLog('refresh_token', 'failure', {
                    reason: 'token_not_found',
                    userId: user.id,
                    ...clientInfo
                });
                return {
                    status: 401,
                    error: 'Invalid refresh token'
                };
            }

            const accessToken = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role: user.role
                },
                JWT_ACCESS_SECRET,
                { expiresIn: '15m' }
            );

            auditLog('refresh_token', 'success', {
                userId: user.id,
                ...clientInfo
            });

            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                auditLog('refresh_token', 'failure', {
                    reason: 'invalid_token_format',
                    ...clientInfo
                });
                return {
                    status: 401,
                    error: 'Invalid refresh token'
                };
            }

            errorLog(error as Error, {
                action: 'refresh_token',
                ...clientInfo
            });
            return {
                status: 500,
                error: 'Token refresh failed'
            };
        }
    }
};