const rateLimit = require('express-rate-limit');

// Rate limiter specifically for AI-calling endpoints to control cost/abuse
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many AI requests from this device. Please wait a moment and try again.',
  },
});

// A slightly looser limiter for general API routes
const generalRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please slow down.',
  },
});

module.exports = { aiRateLimiter, generalRateLimiter };
