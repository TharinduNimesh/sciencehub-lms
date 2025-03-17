import type { Request, Response } from 'express';
import { authService } from '@/services/auth.service';
import type { SignInRequest } from '@/types/auth.types';
import { auditLog, errorLog } from '@/lib/logger.lib';

export const authController = {
    async signIn(req: Request<{}, {}, SignInRequest>, res: Response) {
        try {
            const { email, password } = req.body;

            if (!req.clientInfo) {
                return res.status(400).json({
                    success: false,
                    error: 'Client information is required',
                    code: 'AUTH_MISSING_CLIENT_INFO'
                });
            }

            const result = await authService.signIn(email, password, req.clientInfo);

            if ('error' in result) {
                return res.status(result.status).json({
                    success: false,
                    error: result.error,
                    code: result.status === 401 ? 'AUTH_INVALID_CREDENTIALS' : 
                          result.status === 403 ? 'AUTH_ACCOUNT_INACTIVE' : 
                          'AUTH_ERROR'
                });
            }

            // Set HTTP-only cookie with refresh token
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                path: '/api/auth' // Restrict cookie to refresh token endpoint
            });

            // Return success response with access token
            return res.status(200).json({
                success: true,
                accessToken: result.accessToken,
                user: result.user
            });
        } catch (error) {
            errorLog(error as Error, { 
                action: 'sign_in_controller',
                ...req.clientInfo
            });
            return res.status(500).json({
                success: false,
                error: 'Authentication failed',
                code: 'AUTH_SERVER_ERROR'
            });
        }
    },

    async refreshToken(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies;

            if (!req.clientInfo) {
                return res.status(400).json({
                    success: false,
                    error: 'Client information is required',
                    code: 'AUTH_MISSING_CLIENT_INFO'
                });
            }

            if (!refreshToken) {
                auditLog('refresh_token', 'failure', {
                    reason: 'missing_token',
                    ...req.clientInfo
                });
                return res.status(401).json({
                    success: false,
                    error: 'Refresh token is required',
                    code: 'AUTH_REFRESH_TOKEN_MISSING'
                });
            }

            const result = await authService.refreshAccessToken(refreshToken, req.clientInfo);

            if ('error' in result) {
                // Clear the invalid refresh token cookie
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/api/auth/refresh-token'
                });

                return res.status(result.status).json({
                    success: false,
                    error: result.error,
                    code: 'AUTH_REFRESH_TOKEN_INVALID'
                });
            }

            return res.status(200).json({
                success: true,
                accessToken: result.accessToken,
                user: result.user
            });
        } catch (error) {
            errorLog(error as Error, {
                action: 'refresh_token_controller',
                ...req.clientInfo
            });
            return res.status(500).json({
                success: false,
                error: 'Token refresh failed',
                code: 'AUTH_REFRESH_ERROR'
            });
        }
    },

    async signOut(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies;
            
            if (!req.user?.userId || !refreshToken) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    code: 'AUTH_REQUIRED'
                });
            }

            const result = await authService.signOut(req.user.userId, refreshToken, req.clientInfo || {
                ip: req.ip || '',
                userAgent: req.get('user-agent') || 'unknown'
            });

            if (!result.success) {
                return res.status(500).json({
                    success: false,
                    error: 'Sign out failed',
                    code: 'AUTH_SIGN_OUT_ERROR'
                });
            }

            // Clear the refresh token cookie
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/api/auth/refresh-token'
            });

            return res.status(200).json({
                success: true,
                message: 'Successfully signed out'
            });
        } catch (error) {
            errorLog(error as Error, {
                action: 'sign_out_controller',
                ...req.clientInfo
            });
            return res.status(500).json({
                success: false,
                error: 'Sign out failed',
                code: 'AUTH_SIGN_OUT_ERROR'
            });
        }
    }
};