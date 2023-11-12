import IOtp from "../../interfaces/Utility/otpInterface";
import { Document, model, Schema, Types } from "mongoose";
// import { OtpType } from "../../utils/Enums";
// import { IOtpCodeInterface } from "../../interfaces/Utility/otpCodeInterface";


interface Otp<T> extends IOtp<T>, Document {}


const otpSchema: Schema = new Schema<IOtp<Types.ObjectId>>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        // type: {
        //     type: String,
        //     enum: Object.values(OtpType),
        // },
        type: {
            type: Schema.Types.ObjectId,
            ref: 'OtpCode',
        },
        // uniqueString: {
        //     type: String,
        //     // required: true,
        //     default: null,
        // },
        otp: {
            type: String,
            required: true,
        },
        otpExpiration: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);


const Otp = model<Otp<Types.ObjectId>>("Otp", otpSchema);
export default Otp;
