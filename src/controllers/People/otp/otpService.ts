import Otp from "../../../models/Utility/otp";
import { generateOtp, verifyOtp } from "../../../utils/otp-service";
import { IUserInterface } from "../../../interfaces/People/userInterface";
import { OtpType } from "../../../utils/Enums";
import { HttpCode, AppError } from "../../../exceptions/appError";
// import IOtp from "../../../interfaces /People/otpInterface";



export class OtpController {

    async createOtp (savedUser: IUserInterface | any, OtpType: string): Promise<string> {
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
        user: IUserInterface | any,
        userOtpCode: string
    ){
        //VERIFYING OTP
        let isOtpValid = await verifyOtp(user._id, userOtpCode);

        user.isVerified = true;
        user.save();

        //DELETE OTP AFTER THE USER HAS BEEN VERIFIED 
        await Otp.findByIdAndDelete(isOtpValid);
    }
}

