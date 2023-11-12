import { Document, model, Schema } from "mongoose";
import { IPersonnalInterface } from "../../interfaces/Business/PersonnalInterface";


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface Personnal extends IPersonnalInterface, Document { }

const personnalSchema: Schema = new Schema<IPersonnalInterface>({
    businessOwner: {
        type: String,
        required: [true, 'Business Name is required'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    businessOwnerType: {
        type: String,
        required: [true, 'Business Type is required'],
        maxlength: 100,
        minlength: 10,
        trim: true
    },
    utilityBill: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        default: {
            public_id: 'default_public_id',
            secure_url: "https://i.ibb.co/4pDNDk1/avatar.png",
        },
    },
    
},
    { timestamps: true }
);

const Personnal = model<IPersonnalInterface>("Personnal", personnalSchema);
export default Personnal;


