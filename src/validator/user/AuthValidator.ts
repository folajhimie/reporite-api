import { Request, Response, NextFunction } from 'express';
import { body as bodyValidator, Result, ResultFactory, ValidationError, validationResult } from 'express-validator';

export const validateCreateUser = (req: Request, res: Response,  next: NextFunction) => {
    [
        // Express-validator checks
        bodyValidator('firstname').notEmpty().isString().withMessage('First name must be a string'),
        bodyValidator('secondname').notEmpty().isString().withMessage('Second name must be a string'),
        bodyValidator('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .not()
            .toLowerCase()
            .notEmpty()
            .equals('password')
            .withMessage('Password should not contain the word "password"'),
        bodyValidator('email').isEmail().withMessage('Invalid email address'),
        bodyValidator('phone')
            .trim()
            .notEmpty()
            .withMessage('Phone number is required')
            .matches(/^[0-9]{10}$/)
            .withMessage('Phone number must be a valid 10-digit number'),
        bodyValidator('confirmPassword').custom((value: string, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
        bodyValidator('roles').notEmpty().isString().withMessage('Role is required'),
        // Add more validation rules as needed
    ]

    // const errors = validationResult(req);
    const errors: Result<ValidationError>  = validationResult(req);
    

    if (!errors.isEmpty()) {
        const errorArray : ValidationError[] = errors.array()
        console.log("err ...", errorArray);
        
        
        const error = errorArray.map((error: any) => {
            return { message: error.msg, field: error };
        });; 

        return res.status(500).json({
            status: false,
            error
        })
        
    }
    next ()

    // If there are no validation errors, proceed to the next middleware
    // next();
};


export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
    [
        // Express-validator checks
       bodyValidator('email').isEmail().withMessage('Invalid email address'),
       bodyValidator('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ]

    // const errors = validationResult(req);
    const errors: Result<ValidationError>  = validationResult(req);
    

    if (!errors.isEmpty()) {
        const errorArray : ValidationError[] = errors.array()
        console.log("err ...", errorArray);
        
        
        const error = errorArray.map((error: any) => {
            return { message: error.msg, field: error };
        });; 

        return res.status(500).json({
            status: false,
            error
        })
        
    }
    next ()
};

