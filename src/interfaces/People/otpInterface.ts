import { OtpType } from "../../utils/Enums";

export default interface IOtp<T> {
    userId: T;
    type: OtpType;
    otp: string;
    otpExpiration: Date;
}