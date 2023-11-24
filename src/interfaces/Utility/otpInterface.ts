// import { OtpType } from "../../utils/Enums";
import { IOtpCodeInterface } from "./otpCodeInterface";
import mongoose, { Document, Schema, Model, Types } from 'mongoose';


export default interface IOtp<T> {
    userId: T;
    // type: Types.ObjectId | IOtpCodeInterface | "created";
    type: string;
    // uniqueString: string;
    otp: string;
    otpExpiration: Date;
    // user: Types.ObjectId | IUserInterface | null;
}