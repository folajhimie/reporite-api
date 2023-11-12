import { Document, model, Schema } from "mongoose";
import { IPersonnalInterface } from "../../interfaces/Business/PersonnalInterface";


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface Personnal extends IPersonnalInterface, Document { }

const personnalSchema: Schema = new Schema<IPersonnalInterface>({
    businessVerificationType: {
        type: String,
        required: [true, 'Business Verification Type is required'],
        maxlength: 200,
        minlength: 3,
        trim: true
    },
    businessVerificationNumber: {
        type: String,
        required: [true, 'Business Verification Number is required'],
        maxlength: 100,
        minlength: 10,
        trim: true
    },
    businessVerificationImage: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
    businessUtilityBill: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        
    },
    
},
    { timestamps: true }
);

const Personnal = model<IPersonnalInterface>("Personnal", personnalSchema);
export default Personnal;


