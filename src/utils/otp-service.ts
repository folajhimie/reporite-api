// import otp from "../models/People/otp";
import Otp from "../models/Utility/otp";
import { User } from "../models/People/user";
import { HttpCode, AppError } from "../exceptions/appError";



export const generateOtp = function(len: number): string {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < len; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]; 
    }
    return OTP;
}

//VERIFY GENERATED OTP
export const verifyOtp = async function (
    userId: string,
    userOtpCode: string
): Promise<any> {
    // let userId = user?.username
    let existOtp = await Otp.findOne({
       userId: userId,
    }).exec();

    let user = await User.findById(userId).exec();

    const currentDate = new Date();

    // SEND RESPONSE TO USER THAT OTP WAS NOT CREATED
    if (!existOtp) {
        throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'Otp does not exist!'});
    }

    // DELETE OTP AFTER 30MINS OF ITS CREATION
    if (existOtp.otpExpiration < currentDate) {
       await existOtp.deleteOne();
       throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Otp has already expired. resend Otp again!'});
    }

    // Check if the provided OTP matches the stored OTP
    if (userOtpCode !== existOtp.otp) {
        throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'Your Otp input does not match with the Otp in the table!' });
    }

    //CHECK IF USER HAS BEEN VERIFIED ALREADY. IF IT IS TRUE SEND A RESPONSE TO NOTIFY THE USER
    if (user?.isVerified) {
        throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: 'This user has already been verified!'}); 
    }

    return existOtp;
};