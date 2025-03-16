import { RateLimiterMemory } from 'rate-limiter-flexible';
import { auditLog } from '@/lib/logger.lib';

const rateLimitConfig = {
    signIn: {
        points: 5,  // Increased from 5 to 10 attempts
        duration: 15 * 60,  // 15 minutes in seconds
        blockDuration: 60 * 60  // 1 hour in seconds
    },
    refreshToken: {
        points: 60,  // 60 attempts
        duration: 60 * 60,  // 1 hour in seconds
        blockDuration: 60 * 60  // 1 hour in seconds
    },
    maxFailedAttempts: Number(process.env.MAX_FAILED_ATTEMPTS) || 10,
    ipBlockDuration: Number(process.env.IP_BLOCK_DURATION) || 86400, // 24 hours in seconds
};

// Store for tracking failed attempts by IP
const failedAttempts = new Map<string, number>();
const blockedIPs = new Map<string, number>();

// Separate rate limiters for different endpoints
const signInLimiter = new RateLimiterMemory({
    points: rateLimitConfig.signIn.points,
    duration: rateLimitConfig.signIn.duration,
    blockDuration: rateLimitConfig.signIn.blockDuration,
});

const refreshTokenLimiter = new RateLimiterMemory({
    points: rateLimitConfig.refreshToken.points,
    duration: rateLimitConfig.refreshToken.duration,
    blockDuration: rateLimitConfig.refreshToken.blockDuration,
});

// IP-based blocker for multiple failures
const ipBlocker = new RateLimiterMemory({
    points: rateLimitConfig.maxFailedAttempts,
    duration: rateLimitConfig.ipBlockDuration,
    blockDuration: rateLimitConfig.ipBlockDuration,
});

export const rateLimiterService = {
    async checkRateLimit(ip: string, type: 'signIn' | 'refreshToken' = 'signIn'): Promise<{ blocked: boolean; delay?: number; remainingPoints?: number }> {
        try {
            // Check if IP is blocked
            if (blockedIPs.has(ip)) {
                const blockExpiry = blockedIPs.get(ip)!;
                if (Date.now() < blockExpiry * 1000) {  // Convert seconds to milliseconds
                    console.log(`IP ${ip} is blocked until ${new Date(blockExpiry * 1000).toISOString()}`);
                    return { blocked: true };
                }
                blockedIPs.delete(ip);
            }

            // Use appropriate rate limiter based on type
            const limiter = type === 'signIn' ? signInLimiter : refreshTokenLimiter;
            const res = await limiter.consume(ip);

            // Calculate progressive delay based on failed attempts
            const failCount = failedAttempts.get(ip) || 0;
            const delay = failCount > 0 ? Math.min(1000 * Math.pow(2, failCount - 1), 8000) : 0;

            console.log(`Rate limit check for ${ip} (${type}): remaining points=${res.remainingPoints}, delay=${delay}ms`);

            return { 
                blocked: false, 
                delay,
                remainingPoints: res.remainingPoints
            };
        } catch (error) {
            console.log(`Rate limit exceeded for ${ip} (${type})`);
            return { blocked: true };
        }
    },

    async recordFailedAttempt(ip: string): Promise<void> {
        const currentFails = (failedAttempts.get(ip) || 0) + 1;
        failedAttempts.set(ip, currentFails);

        console.log(`Recording failed attempt for ${ip}: attempt ${currentFails} of ${rateLimitConfig.maxFailedAttempts}`);

        try {
            await ipBlocker.consume(ip);
        } catch (error) {
            // IP has exceeded maximum failed attempts
            const blockExpiry = Math.floor(Date.now() / 1000) + rateLimitConfig.ipBlockDuration;
            blockedIPs.set(ip, blockExpiry);
            failedAttempts.delete(ip);

            console.log(`IP ${ip} blocked until ${new Date(blockExpiry * 1000).toISOString()} due to too many failed attempts`);

            auditLog('rate_limit', 'blocked', {
                ip,
                reason: 'max_failures_exceeded',
                blockDuration: rateLimitConfig.ipBlockDuration,
                blockExpiry: new Date(blockExpiry * 1000).toISOString()
            });
        }
    },

    resetFailedAttempts(ip: string): void {
        const hadFailedAttempts = failedAttempts.has(ip);
        failedAttempts.delete(ip);
        if (hadFailedAttempts) {
            console.log(`Reset failed attempts for ${ip}`);
        }
    }
};