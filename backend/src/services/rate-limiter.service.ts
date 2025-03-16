import { RateLimiterMemory } from 'rate-limiter-flexible';
import { auditLog } from '@/lib/logger.lib';

const rateLimitConfig = {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    maxAttempts: Number(process.env.RATE_LIMIT_MAX_ATTEMPTS) || 5,
    blockDuration: Number(process.env.RATE_LIMIT_BLOCK_DURATION) || 3600000,
    maxFailedAttempts: Number(process.env.MAX_FAILED_ATTEMPTS) || 10,
    ipBlockDuration: Number(process.env.IP_BLOCK_DURATION) || 86400000,
};

// Store for tracking failed attempts by IP
const failedAttempts = new Map<string, number>();
const blockedIPs = new Map<string, number>();

// Progressive rate limiter
const progressiveRateLimiter = new RateLimiterMemory({
    points: rateLimitConfig.maxAttempts,
    duration: rateLimitConfig.windowMs / 1000, // Convert to seconds
    blockDuration: rateLimitConfig.blockDuration / 1000,
});

// IP-based blocker for multiple failures
const ipBlocker = new RateLimiterMemory({
    points: rateLimitConfig.maxFailedAttempts,
    duration: rateLimitConfig.ipBlockDuration / 1000,
    blockDuration: rateLimitConfig.ipBlockDuration / 1000,
});

export const rateLimiterService = {
    async checkRateLimit(ip: string): Promise<{ blocked: boolean; delay?: number; }> {
        try {
            // Check if IP is blocked
            if (blockedIPs.has(ip)) {
                const blockExpiry = blockedIPs.get(ip)!;
                if (Date.now() < blockExpiry) {
                    return { blocked: true };
                }
                blockedIPs.delete(ip);
            }

            // Consume point from the rate limiter
            await progressiveRateLimiter.consume(ip);

            // Calculate progressive delay based on failed attempts
            const failCount = failedAttempts.get(ip) || 0;
            const delay = failCount > 0 ? Math.min(1000 * Math.pow(2, failCount - 1), 8000) : 0;

            return { blocked: false, delay };
        } catch (error) {
            return { blocked: true };
        }
    },

    async recordFailedAttempt(ip: string): Promise<void> {
        const currentFails = (failedAttempts.get(ip) || 0) + 1;
        failedAttempts.set(ip, currentFails);

        try {
            await ipBlocker.consume(ip);
        } catch (error) {
            // IP has exceeded maximum failed attempts
            blockedIPs.set(ip, Date.now() + rateLimitConfig.ipBlockDuration);
            failedAttempts.delete(ip);

            auditLog('rate_limit', 'blocked', {
                ip,
                reason: 'max_failures_exceeded',
                blockDuration: rateLimitConfig.ipBlockDuration
            });
        }
    },

    resetFailedAttempts(ip: string): void {
        failedAttempts.delete(ip);
    }
};