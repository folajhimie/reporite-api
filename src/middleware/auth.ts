import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { User } from '../models/People/user';
import { AppError, HttpCode } from '../exceptions/appError';
import asyncMiddleware from './catchAsyncErrors';
// import Shop from '../models/Production/Shop/shop';
import dotenv from 'dotenv';
dotenv.config();

interface UserPayload {
    _id: string;
    // isAdmin: boolean;
    roles: string | any; // Assuming role is part of the user payload
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload | any;
            // seller?: Shop | any; // Assuming the type of 'Shop'
        }
    }
}




export const authMiddleware = asyncMiddleware(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization || req.headers.authorization;

        if (!authHeader?.startsWith('Bearer') || !authHeader) {
            return next(new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Unauthorized'
            }));
        }

        const token = authHeader.split(' ')[1];

        // const token = req.header('Authorization')?.replace('Bearer ', '');
        // const { token } = req.cookies;

        if (!token) {
            return next(new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Please Login to Continue'
            }));
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (error, decoded) => {
                if (error) {
                    throw new AppError({
                        httpCode: HttpCode.BAD_REQUEST,
                        description: 'Token is not valid'
                    });
                } else {
                    req.user = decoded;
                    next();
                }
            }
        );
    } catch (error) {
        throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: 'You must be logged in'
        });
    }
});


export const isAdmin = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!roles.includes(req.user?.roles)) {
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

export const verifiedOnly = asyncMiddleware(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.user && req.user?.isVerified) {
            next()
        } else {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Not authorized, account not verified'
            });
        }
    } catch (error) {
        throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Problem occured while trying to authorize!'
        });
    }
});

// export const authorOnly = asyncMiddleware(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         if (req.user.role === "author" || req.user.role === "admin") {
//             next()
//         } else {
//             throw new AppError({
//                 httpCode: HttpCode.UNAUTHORIZED,
//                 description: 'Not authorized, account not verified'
//             });
//         }
//     } catch (error) {
//         throw new AppError({
//             httpCode: HttpCode.BAD_REQUEST,
//             description: 'Problem occured while trying to authorize!'
//         });
//     }
// });







