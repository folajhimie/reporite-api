// import { Request, Response, NextFunction } from 'express';
import { body as bodyValidator, ResultFactory, validationResult } from 'express-validator';



export const validateCreatePersonnal = async (req: Request) => {
    await Promise.all([
        // Express-validator checks
        bodyValidator('businessVerificationType').isString().notEmpty().withMessage('Business Verification Type must be a string'),
        bodyValidator('businessVerificationNumber').isString().notEmpty().withMessage('Business Verification Number must be a string'),
        bodyValidator('businessVerificationImage.*.public_id').isString().optional().withMessage('Business Verification Image Public id must be a string'),
        bodyValidator('businessVerificationImage.*.secure_url').isString().optional().withMessage('Business Verification Image Secure Url must be a string'),
        bodyValidator('businessUtilityBill.*.public_id').isString().optional().withMessage('Business Utility Bill Public id must be a string'),
        bodyValidator('businessUtilityBill.*.secure_url').isString().optional().withMessage('Business Utility Bill Secure Url must be a string'),
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




