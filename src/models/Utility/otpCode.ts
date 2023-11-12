import { Document, model, Schema } from "mongoose";
// import { IRoleInterface } from "../../interfaces/People/roleInterface";
import { IOtpCodeInterface } from "../../interfaces/Utility/otpCodeInterface";




//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface OtpCode extends IOtpCodeInterface, Document {}

const otpCodeSchema: Schema = new Schema<IOtpCodeInterface>({
    name: {
        type: String,
        required: [true, 'OtpCode is required'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    code: {
        type: String, 
    },
},
    { timestamps: true }
);

const OtpCode = model<IOtpCodeInterface>("OtpCode", otpCodeSchema);
export default OtpCode;


