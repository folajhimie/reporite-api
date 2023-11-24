import { Request, Response, NextFunction } from 'express';
import { body as bodyValidator, Result, ResultFactory, ValidationError, validationResult } from 'express-validator';



export const validateCreateBusiness = (req: Request, res: Response,  next: NextFunction) => {
    // console.log("request...", req);
    [
        // Express-validator checks
        bodyValidator('businessname').isString().notEmpty().withMessage('Business name must be a string'),
        bodyValidator('businesstype').isString().notEmpty().withMessage('Business Type must be a string'),
        bodyValidator('businessaccount').isBoolean().notEmpty().withMessage('Business Account must be a boolean'),
        bodyValidator('businesscategory').isString().notEmpty().withMessage('Business Category must be a string'),
        bodyValidator('businesscode').isString().notEmpty().withMessage('Business Code must be a string'),
        bodyValidator('country').isString().notEmpty().withMessage('Country must be a string'),
        bodyValidator('state').isString().notEmpty().withMessage('State must be a string'),
        bodyValidator('businessaddress').isString().notEmpty().withMessage('Business Address must be a string'),
        bodyValidator('estimatedmonthly').isString().notEmpty().withMessage('Estimated Monthly must be a string'),
        bodyValidator('businessavatar.*.public_id').isString().optional().withMessage('Business Avatar Public id must be a string'),
        bodyValidator('businessavatar.*.secure_url').isString().optional().withMessage('Business Avatar Secure Url must be a string'),
        bodyValidator('businessdescription').isString().notEmpty().withMessage('Business Description must be a string'),
        // Add more validation rules as needed
    ];

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




