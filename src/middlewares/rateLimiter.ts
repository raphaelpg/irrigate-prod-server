import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 30
});

export const restrictiveLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many requests from this IP, please try again after half an hour"
});

