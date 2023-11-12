// import { Request, Response, NextFunction } from 'express';
import { body as bodyValidator, ResultFactory, validationResult } from 'express-validator';

export const validateCreateUser = async (req: Request) => {
    await Promise.all([
        // Express-validator checks
        bodyValidator('firstName').isString().withMessage('First name must be a string'),
        bodyValidator('secondName').isString().withMessage('Second name must be a string'),
        bodyValidator('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .not()
            .toLowerCase()
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
        // Add more validation rules as needed
    ]);

    // const errors = validationResult(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw errors.array();
    }

    // If there are no validation errors, proceed to the next middleware
    // next();
};


export const validateLoginUser = async (req: Request) => {
    await Promise.all([
        // Express-validator checks
       bodyValidator('email').isEmail().withMessage('Invalid email address'),
       bodyValidator('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw errors.array();
    }
};

