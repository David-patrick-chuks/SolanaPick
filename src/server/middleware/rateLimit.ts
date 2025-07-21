import rateLimit from 'express-rate-limit';

// Configurable rate limiting middleware
export const rateLimitMiddleware = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 min default
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // 100 reqs per window per IP
});
