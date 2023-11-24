import { Document, model, Schema } from "mongoose";
import { IBusinessInterface } from "../../interfaces/Business/BusinessInterface";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 */


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface Business extends IBusinessInterface, Document { }

const businessSchema: Schema = new Schema<IBusinessInterface>({
    businessname: {
        type: String,
        required: [true, 'Business Name is required'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    businesstype: {
        type: String,
        required: [true, 'Business Type is required'],
        trim: true
    },
    businessaccount: {
        type: Boolean,
        required: true
    },
    businesscategory: {
        type: String,
        required: [true, 'Business Category is required'],
    },
    businesscode: {
        type: String,
        required: [true, 'Business Code is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
    },
    businessaddress: {
        type: String,
        required: [true, 'Business Address is required'],
    },
    estimatedmonthly: {
        type: String,
        required: [true, 'Estimated Monthly is required'],
    },
    businessavatar: {
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
    businessdescription: {
        type: String,
        // required: [true, 'Business Description is required'],
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // personnal: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Personnal',
    //     required: true
    // },
    // products: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Business',
    //     required: true
    // },
},
    { timestamps: true }
);

const Business = model<IBusinessInterface>("Business", businessSchema);
export default Business;


