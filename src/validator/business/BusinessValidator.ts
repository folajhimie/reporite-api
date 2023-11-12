// import { Request, Response, NextFunction } from 'express';
import { body as bodyValidator, ResultFactory, validationResult } from 'express-validator';



export const validateCreateBusiness = async (req: Request) => {
    await Promise.all([
        // Express-validator checks
        bodyValidator('businessName').isString().notEmpty().withMessage('Business name must be a string'),
        bodyValidator('businessType').isString().notEmpty().withMessage('Business Type must be a string'),
        bodyValidator('businessAccount').isBoolean().notEmpty().withMessage('Business Account must be a boolean'),
        bodyValidator('businessCode').isString().notEmpty().withMessage('Business Code must be a string'),
        bodyValidator('country').isString().notEmpty().withMessage('Country must be a string'),
        bodyValidator('state').isString().notEmpty().withMessage('State must be a string'),
        bodyValidator('businessAddress').isString().notEmpty().withMessage('Business Address must be a string'),
        bodyValidator('estimatedMonthly').isString().notEmpty().withMessage('Estimated Monthly must be a string'),
        bodyValidator('businessAvatar.*.public_id').isString().optional().withMessage('Business Avatar Public id must be a string'),
        bodyValidator('businessAvatar.*.secure_url').isString().optional().withMessage('Business Avatar Secure Url must be a string'),
        bodyValidator('businessDescription').isString().notEmpty().withMessage('Business Description must be a string'),
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




