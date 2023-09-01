import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/People/user';
import { AppError, HttpCode } from '../exceptions/appError';
import asyncMiddleware from './catchAsyncErrors';
import Shop from '../models/Production/Shop/shop';

interface UserPayload {
    _id: string;
    isAdmin: boolean;
    role: string | any; // Assuming role is part of the user payload
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
            seller?: Shop | any; // Assuming the type of 'Shop'
        }
    }
}

export const authMiddleware = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req.header('Authorization')?.replace('Bearer ', '');

        const { token } = req.cookies;

        if (!token) {
            // throw new Error('Authentication failed');
            return next(new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Please Login to Continue' }));
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;
        const user = await User.findById(decoded._id);
        if (!user) {
            // throw new Error('Authentication failed');
            return next(new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Please Login to Continue' }));
        }
        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'You must be logged in' });
        // res.status(401).send({ error: 'Authentication failed' });
    }
});


export const isSeller = asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    const { seller_token } = req.cookies;
    try {
        if (!seller_token) {
            return next(new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Please Login to Continue' }));
        }
    
        const decoded: any = jwt.verify(seller_token, process.env.ACCESS_TOKEN_SECRET!);
    
        req.seller = await Shop.findById(decoded.id);
    
        next();
    } catch (error) {
        throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: '403 is Forbidden' });
        // res.status(403).send({ error: 'Unauthorized' });
    }
});


// export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         if (!req.user?.isAdmin) {
//             // throw new Error('Unauthorized');
//             throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Unauthorized' });
//         }
//         next();
//     } catch (error) {
//         throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: '403 is Forbidden' });
//         // res.status(403).send({ error: 'Unauthorized' });
//     }
// };

export const isAdmin = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!roles.includes(req.user?.role)) {
                // Assuming you have an ErrorHandler class
                return next(new AppError({ httpCode: HttpCode.FORBIDDEN, description: `${req.user?.role} cannot access this resource!` }));
            }
            next();
        } catch (error) {
            throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: '403 is Forbidden' });
            // res.status(403).send({ error: 'Unauthorized' });
        }
    };
};







