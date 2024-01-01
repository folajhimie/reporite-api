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
    // console.log("refresh token..", req.headers, req.headers.authorization,"all the header...", req.headers.Authorization);
    try {
        const authHeader: string | any = req.headers.authorization || req.headers.Authorization;

        console.log("auth in the bank..", authHeader)


        if (!authHeader?.startsWith('Bearer ') || !authHeader) {
            return next(new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Unauthorized'
            }));
        }

        const token = authHeader.split(' ')[1];
        console.log("token in the middleware..", token);

        if (!token) {
            return next(new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Please Login to Continue'
            }));
        }

        // console.log("all the jwt token..", process.env.ACCESS_TOKEN_SECRET as string)

        // Verify Token
        // const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        // Get user id from token
        // const user = await User.findById(verified.id).select("-password");

        // console.log("decoded for life...", verified)
        // req.user = decoded;
        // next();
        
        jwt.verify(
            token,
            // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY1MGNmNmNkOTQxMzIyNmJmNjBmOGEiLCJmaXJzdG5hbWUiOiJGZW1pIiwibGFzdG5hbWUiOiJEcmF5IiwiZW1haWwiOiJuYXRpdmVkcmF5QGdtYWlsLmNvbSIsInJvbGVzIjoiT3duZXIiLCJpc1ZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzAzOTcxODMzLCJleHAiOjE3MDQwNTgyMzN9.zPsv8tdb4t1l2phXPK-ltm9f8irpASAxAXcWPjKd5WM' as any,
            process.env.ACCESS_TOKEN_SECRET as string,
            { algorithms: ['HS256'] },
            (error: string | any, decoded: object | any) => {
                if (error) {
                    console.log("ALL error in the jwt..", error )
                    throw new AppError({
                        httpCode: HttpCode.BAD_REQUEST,
                        description: 'Token is not valid'
                    });
                }   
                else {
                    console.log("all the decoded in the auth...", decoded)
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

        console.log("request in the auth bank..", req.user)
        try {
            if (!roles.includes(req.user?.roles)) {
                // Assuming you have an ErrorHandler class
                return next(new AppError({ httpCode: HttpCode.FORBIDDEN, description: `${req.user?.roles} cannot access this resource!` }));
            }
            next();
        } catch (error) {
            throw new AppError({ 
                httpCode: HttpCode.FORBIDDEN, 
                description: '403 is Forbidden' 
            });
            // res.status(403).send({ error: 'Unauthorized' });
        }
    };
};

export const verifiedOnly = asyncMiddleware(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (req.user && req.user?.isVerified === true) {
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







