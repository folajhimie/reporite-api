import Otp from "../../../models/People/otp";
import { generateOtp, verifyOtp } from "../../../utils/otp-service";
import { OtpType } from "../../../utils/Enums";
import { HttpCode, AppError } from "../../../exceptions/appError";
// import IOtp from "../../../interfaces /People/otpInterface";
// import { UserInterface } from "../../../interfaces /People/userInterface";


export class OtpController {

    async createOtp (savedUser: any, OtpType: string, tokenExpiration?:any): Promise<string> {

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
            otpExpiration: new Date(tokenExpiration),
        });

        await newOtp.save();

        return otp;

    }

    async verifyOtp (
        user: any,
        otp: string,
        OtpType: string
    ){
        //VERIFYING OTP
        let isOtpValid = await verifyOtp(user._id, otp, OtpType);

        if (!isOtpValid) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'This OTP has Invalid.!' 
            });
        }


        user.isEmailVerified = true;
        user.save();
        //DELETE OTP
        const foundOtp = await Otp.findByIdAndDelete(isOtpValid);
        return foundOtp;

    }
}

