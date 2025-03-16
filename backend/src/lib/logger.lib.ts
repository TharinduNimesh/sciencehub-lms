import winston from 'winston';
import path from 'path';

const logDir = process.env.LOG_DIR || 'logs';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'auth-service' },
    transports: [
        new winston.transports.File({ 
            filename: path.join(logDir, 'error.log'), 
            level: 'error' 
        }),
        new winston.transports.File({ 
            filename: path.join(logDir, 'auth.log'),
            level: 'info'
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export const auditLog = (
    action: string, 
    status: 'success' | 'failure' | 'blocked', 
    details: Record<string, any>
) => {
    logger.info('Auth audit log', {
        action,
        status,
        ...details,
        timestamp: new Date().toISOString(),
        ip: details.ip || 'unknown',
        userAgent: details.userAgent || 'unknown'
    });
};

export const errorLog = (
    error: Error, 
    context: Record<string, any>
) => {
    logger.error('Auth error', {
        error: error.message,
        stack: error.stack,
        ...context,
        timestamp: new Date().toISOString()
    });
};

export default logger;