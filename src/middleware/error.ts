import { Request, Response, NextFunction } from 'express';

class ErrorHandler extends Error {
    statusCode: number;
    message: string;
    // code?: number;

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        // this.code = code;
    }
}

export const errorHandler = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { statusCode, message } = err;

    statusCode = statusCode || 500
    message = message || "Interval server error"
    // code = code || 400

    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resources not found with this id..Invalid ${err}`;
        err = new ErrorHandler(400, message);
    }

    // Duplicate key error
    if (err instanceof ErrorHandler) {
        if (err.message.includes('11000')) {
            // Handle the specific error with code 11000
            const message = `Duplicate ${Object.keys(err)} Entered`;
            err = new ErrorHandler(400, message);
            //   console.log('Error with code 11000 occurred:', err.message);
        } else {
            // Handle other errors
            console.log('An error occurred:', err.message);
        }
    }


    // Wrong Jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again`;
        err = new ErrorHandler(400, message);
    }

    //Jwt expired error
    if (err.name === "TokenExpiredError") {
        const message = `Your url is expired please try again`;
        err = new ErrorHandler(400, message);
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

// export { ErrorHandler, errorHandler };





