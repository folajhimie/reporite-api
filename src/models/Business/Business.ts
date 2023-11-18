import { Document, model, Schema } from "mongoose";
import { IBusinessInterface } from "../../interfaces/Business/BusinessInterface";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 */


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface Business extends IBusinessInterface, Document { }

const businessSchema: Schema = new Schema<IBusinessInterface>({
    businessName: {
        type: String,
        required: [true, 'Business Name is required'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    businessType: {
        type: String,
        required: [true, 'Business Type is required'],
        maxlength: 100,
        minlength: 10,
        trim: true
    },
    businessAccount: {
        type: Boolean,
    },
    businessCategory: {
        type: String,
        required: [true, 'Business Category is required'],
        maxlength: 150,
        minlength: 50,
        trim: true
    },
    businessCode: {
        type: String,
        required: [true, 'Business Code is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        maxlength: 200,
        minlength: 50,
        trim: true
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        maxlength: 200,
        minlength: 50,
        trim: true
    },
    businessAddress: {
        type: String,
        required: [true, 'Business Address is required'],
        maxlength: 200,
        minlength: 50,
        trim: true
    },
    estimatedMonthly: {
        type: String,
        required: [true, 'Estimated Monthly is required'],
        maxlength: 100,
        minlength: 20,
        trim: true
    },
    businessAvatar: {
        public_id: {
            type: String,
            default: 'default_public_id',
            required: true,
        },
        secure_url: {
            type: String,
            default: "https://i.ibb.co/4pDNDk1/avatar.png",  
            required: true,
        },
        
    },
    businessDescription: {
        type: String,
        required: [true, 'Business Description is required'],
        maxlength: 100,
        minlength: 20,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personnal: {
        type: Schema.Types.ObjectId,
        ref: 'Personnal',
        required: true
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
},
    { timestamps: true }
);

const Business = model<IBusinessInterface>("Business", businessSchema);
export default Business;


