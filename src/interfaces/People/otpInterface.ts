import { OtpType } from "../../utils/Enums";

export default interface IOtp<T> {
    userId: T;
    type: OtpType;
    uniqueString: string;
    otp: string;
    otpExpiration: Date;
}