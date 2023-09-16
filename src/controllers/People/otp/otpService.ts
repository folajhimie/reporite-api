import Otp from "../../../models/People/otp";
import { generateOtp, verifyOtp } from "../../../utils/otp-service";
import { OtpType } from "../../../utils/Enums";
import { HttpCode, AppError } from "../../../exceptions/appError";
// import IOtp from "../../../interfaces /People/otpInterface";
// import { UserInterface } from "../../../interfaces /People/userInterface";


export class OtpController {

    async createOtp (savedUser: any, OtpType: string): Promise<string> {
        // //GENERATE OTP FOR MAIL VERIFICATION
        // let tokenExpiration: any = new Date();
        // tokenExpiration = tokenExpiration.setMinutes(
        //     tokenExpiration.getMinutes() + 10
        // );
        const otp: string = generateOtp(4);

        let newOtp = new Otp({
            userId: savedUser?._id,
            type: OtpType,
            otp,
            otpExpiration: Date.now() + 60 * (60 * 1000), // Thirty minutes
        });

        await newOtp.save();

        return otp;
    }

    async verifyOtp (
        user: any,
        userOtpCode: string
    ){
        //VERIFYING OTP
        let isOtpValid = await verifyOtp(user._id, userOtpCode);

        user.emailVerified = true;
        user.save();

        //DELETE OTP AFTER THE USER HAS BEEN VERIFIED 
        await Otp.findByIdAndDelete(isOtpValid);
    }
}

