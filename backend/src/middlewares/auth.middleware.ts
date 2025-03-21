import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

interface JwtPayload {
    userId: string;
    email: string;
    role: Role;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] as string | undefined;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export const requireRole = (roles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        next();
    };
};