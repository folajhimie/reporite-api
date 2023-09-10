import IOtp from "../../interfaces/People/otpInterface";
import { Document, model, Schema, Types } from "mongoose";
import { OtpType } from "../../utils/Enums";


interface Otp<T> extends IOtp<T>, Document {}


const otpSchema: Schema = new Schema<IOtp<Types.ObjectId>>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            enum: Object.values(OtpType),
        },
        otp: {
            type: String,
            required: true,
        },
        otpExpiration: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);


const Otp = model<Otp<Types.ObjectId>>("Otp", otpSchema);
export default Otp;
