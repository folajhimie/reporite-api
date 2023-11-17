import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { logEvents } from './Logger';
// import { HttpCode, AppError } from '../exceptions/appError';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts from this IP, please try again after a 60 second pause',
    handler: (req: Request, res: Response, next: NextFunction, options: any) => {
        logEvents(`Too Many Requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
        res.status(options.statusCode).send(options.message);
    },
    skip: (req: Request) => {
        // Add conditions to skip rate limiting for certain requests
        return false;
    },
    keyGenerator: (req: Request) => {
        // Customize how rate limiting key is generated, if needed
        return req.ip;
    },
    statusCode: 429, // HTTP status code to return when rate limit is exceeded
    headers: true, // Send rate limit headers with response
});

export default loginLimiter;
