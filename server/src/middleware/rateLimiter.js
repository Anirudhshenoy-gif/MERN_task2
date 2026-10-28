const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per IP per window
  message: {
    success: false,
    message: 'Too many attempts, try later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = authLimiter;
