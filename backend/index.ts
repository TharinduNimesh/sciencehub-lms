import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { signInRouter } from '@/routes/auth/sign-in.route';
import { refreshTokenRouter } from '@/routes/auth/refresh-token.route';
import { errorLog } from '@/lib/logger.lib';

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

// Rate limiting
const rateLimiter = new RateLimiterMemory({
    points: 10,
    duration: 1,
    blockDuration: 60 * 15
});

app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch {
        res.status(429).json({
            success: false,
            error: 'Too many requests. Please try again later.',
            code: 'RATE_LIMIT_EXCEEDED'
        });
    }
});

// Client info middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    req.clientInfo = {
        ip: req.ip,
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

app.listen(port, () => {
    console.log(`⚡️ Server is running at http://localhost:${port}`);
});