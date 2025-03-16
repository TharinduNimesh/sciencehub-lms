import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { signInRouter } from '@/routes/auth/sign-in.route';
import { refreshTokenRouter } from '@/routes/auth/refresh-token.route';
import { errorLog } from '@/lib/logger.lib';
import { rateLimiterService } from '@/services/rate-limiter.service';

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            clientInfo?: {
                ip: string;
                userAgent: string;
            };
        }
    }
}

const app: Express = express();
const port = process.env.APP_PORT || 8000;

// Basic middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600
}));

// Enhanced rate limiting middleware with progressive delays
app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await rateLimiterService.checkRateLimit(req.ip || '');
        
        if (result.blocked) {
            return res.status(429).json({
                success: false,
                error: 'Too many requests. Please try again later.',
                code: 'RATE_LIMIT_EXCEEDED'
            });
        }

        if (result.delay && result.delay > 0) {
            await new Promise(resolve => setTimeout(resolve, result.delay));
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Client info middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    req.clientInfo = {
        ip: req.ip || '',
        userAgent: req.get('user-agent') || 'unknown'
    };
    next();
});

// Routes
app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'Welcome to ScienceHub LMS API' });
});

// Auth routes
app.use('/api/auth/sign-in', signInRouter);
app.use('/api/auth/refresh-token', refreshTokenRouter);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorLog(err, {
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('user-agent')
    });

    // Check if error is from JWT validation
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Invalid token',
            code: 'AUTH_INVALID_TOKEN'
        });
    }

    // Check if error is from JWT expiration
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            error: 'Token has expired',
            code: 'AUTH_TOKEN_EXPIRED'
        });
    }

    res.status(500).json({
        success: false,
        error: 'An unexpected error occurred',
        code: 'SERVER_ERROR'
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Resource not found',
        code: 'NOT_FOUND'
    });
});

// Validate JWT secrets before starting the server
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets must be configured in environment variables');
}

if (process.env.JWT_ACCESS_SECRET === process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different');
}

app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
});