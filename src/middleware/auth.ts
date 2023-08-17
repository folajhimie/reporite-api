import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/People/user';
import { AppError, HttpCode } from '../exceptions/appError';

interface UserPayload {
    _id: string;
    isAdmin: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            // throw new Error('Authentication failed');
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Authentication failed' });
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;
        const user = await User.findById(decoded._id);
        if (!user) {
            // throw new Error('Authentication failed');
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Authentication failed' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'You must be logged in' });
        // res.status(401).send({ error: 'Authentication failed' });
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.isAdmin) {
            // throw new Error('Unauthorized');
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Unauthorized' });
        }
        next();
    } catch (error) {
        throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: '403 is Forbidden' });
        res.status(403).send({ error: 'Unauthorized' });
    }
};







