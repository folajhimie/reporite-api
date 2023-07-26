import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

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
            throw new Error('Authentication failed');
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;
        const user = await User.findById(decoded._id);
        if (!user) {
            throw new Error('Authentication failed');
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed' });
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.isAdmin) {
            throw new Error('Unauthorized');
        }
        next();
    } catch (error) {
        res.status(403).send({ error: 'Unauthorized' });
    }
};







