// import otp from "../models/People/otp";
import Otp from "../models/People/otp";



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
    userEmail: string,
    otp: string,
    type: string
): Promise<any> {
    // let userId = user?.username
    let existOtp = await Otp.findOne({
        userEmail,
        otp,
        type,
    }).exec();
    const currentDate = new Date();
    if (!existOtp || existOtp.otpExpiration < currentDate) {
        return null;
    }

    return existOtp;
};