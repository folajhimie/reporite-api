import { User } from "../../../models/People/user";
import { AuthRepository } from "./authService";
import { OtpController } from "../otp/otpService";
import { Request, Response, NextFunction } from "express";
import verifyEmail from "../../../views/verifyEmailTemplate";
import MailService from "../../../utils/MailService";
import { jsonOne, jsonAll } from "../../../utils/Reponse";
import { IUserInterface } from "../../../interfaces/People/userInterface";
import { TokenController } from "../token/tokenControllers";
import { OtpType } from "../../../utils/Enums";
import { MailController } from "../../Utility/mailControllers";
import { verifyOtp } from "../../../utils/otp-service";
import { AppError, HttpCode } from "../../../exceptions/appError";
import generateResetPasswordTemplate from "../../../views/resetPasswordTemplate";
import { generateHashPassword } from "../../../utils/password-manager";
import { generateAuthToken } from "../../../utils/token-generator";
import Otp from "../../../models/Utility/otp";
import sendToken from "../../../utils/sendToken";
import loginCode from "../../../views/loginWithCode";
import resendOTPUser from "../../../views/resendOtpTemplate";
// import { AuthRepository } from "./authService";
import IAuthRepository from "../../../repositories/People/users/authRepositories";



export class AuthController {
    async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
        try {
            //CREATE USER  
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.loginWithGoogle(
                req
            );

            // Send HTTP-only cookie and Then hash the user details
            sendToken(resultAuth, res)

            
        } catch (error) {
            next(error);
        }

    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            // const { username, email, phone, password, confirmPassword } = req.body;

            //CREATE USER  
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth : IUserInterface | any = await authRepository.createUser(
                req
            );

            // Send HTTP-only cookie and Then hash the user details
            let tokenAuth = sendToken(resultAuth, res)

            //GENERATE OTP CODE FOR USER
            const otpController = new OtpController();
            let otpType = OtpType.CREATED

            //GENERATE TOKEN FOR THE OTP PAGE TO GET A UNIQUE LINK
            let tokenExpiration = new TokenController();
            let tokenExp = await tokenExpiration.createUniqueToken(resultAuth)

            const { tokenData, sendOtpLink } = tokenExp

            let otpCode = await otpController.createOtp(resultAuth, otpType)

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Account Verification';
            let emailStructure = verifyEmail(otpCode, sendOtpLink)
            await mailController.createMail(emailStructure, resultAuth, req, text)

            //SEND MESSAGE TO USER 
            // return jsonOne<UserInterface>(res, 201, resultAuth);

            let responseAuth = {
                resultAuth,
                accessToken: tokenAuth,
                otpLink: tokenData
            };

            return jsonOne<object>(res, 200, responseAuth);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        // const { email, password } = req.body;
        try {
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.loginUser(
                req.body, req
            );

            // Send HTTP-only cookie
            let tokenAuth = sendToken(resultAuth, res)

            let responseAuth = {
                resultAuth,
                accessToken: tokenAuth,
            };

            return jsonOne<object>(res, 200, responseAuth);

        } catch (error) {
            next(error);
        }
    }

    async sendLoginCode(req: Request, res: Response, next: NextFunction) {
        try {
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.sendLoginCode(
                req.body
            );

            const { userData, hashTokenData } = resultAuth

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Login Access Code - CARTTEL';
            let emailStructure = loginCode(hashTokenData, userData.username)
            mailController.createMail(emailStructure, userData, req, text)

            return jsonOne<object>(res, 200, resultAuth);

        } catch (error) {
            next(error);
        }
    }

    async LoginWithCode(req: Request, res: Response, next: NextFunction) {
        try {
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.loginWithCode(
                req
            );

            // Send HTTP-only cookie
            sendToken(resultAuth, res)

            return jsonOne<object>(res, 200, resultAuth);

        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            //VERIFYING EMAIL
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.forgotPassword(email)

            const { user, resetUrl } = resultAuth

            //GENERATE TOKEN EXPIRATION 
            // let tokenExpiration = new TokenController();
            // let tokenExp = await tokenExpiration.tokenExpiration()

            //GENERATE OTP CODE FOR USER
            // const otpController = new OtpController();
            // let otpType = OtpType.FORGET
            // let otpCode = await otpController.createOtp(resultAuth, otpType)

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Reset Password';
            // let emailStructure = verifyEmail(otpCode)
            //GENERATE OTP AND SEND ON MAIL
            const emailStructure = generateResetPasswordTemplate(
                resetUrl,
                user.username
            );

            mailController.createMail(emailStructure, user, req, text)

            return jsonOne<string>(
                res,
                200,
                'Forget Password OTP sent successfully'
            );
        } catch (error) {
            next(error)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            // const { email, otp, password } = req.body;

            // VERIFYING IF USER EXIST
            const authRepository: IAuthRepository = new AuthRepository();
            await authRepository.resetPassword(req);

            return jsonOne<string>(res, 200, 'Password updated successfully');

            // const { user } = resultAuth

            //CHECK FOR OTP
            // let otptype = OtpType.FORGET
            // let isOtpValid = await verifyOtp(user?.email, otp, otptype);

            // if (!isOtpValid) {
            //     throw new AppError({
            //         httpCode: HttpCode.UNAUTHORIZED,
            //         description: 'This OTP has expired.'
            //     });
            // }

            // //ADD NEW PASSWORD 
            // const hashPassword = await generateHashPassword(password)
            // user.password = hashPassword;
            // await user.save();

            // await Otp.findByIdAndDelete(isOtpValid)

        } catch (error) {
            next(error)
        }

    }

    async verifyUserWithOTP(req: Request, res: Response, next: NextFunction) {
        try {
            // VERIFYING IF USER EXIST
            const authRepository: IAuthRepository = new AuthRepository();
            const verifyUser = await authRepository.verifyUserWithOTP(req);

            const { user, otp } = verifyUser;

            //CHECK FOR OTP
            // let otptype = OtpType.FORGET
            await verifyOtp(user, otp);

            return jsonOne<string>(res, 200, 'OTP verified successfully and user now verified');
        } catch (error) {
            next(error)
        }
    }

    async resendOTP(req: Request, res: Response, next: NextFunction) {
        try {
            // VERIFYING IF USER EXIST
            const authRepository: IAuthRepository = new AuthRepository();
            const resendOTPUser = await authRepository.resendOTP(req);

            const { user } = resendOTPUser;

            //GENERATE OTP CODE FOR USER
            const otpController = new OtpController();
            let otpType = OtpType.VERIFICATION

            let otpCode = await otpController.createOtp(user, otpType);

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Resend OTP To User';
            let emailStructure = resendOTPUser(otpCode)
            await mailController.createMail(emailStructure, user, req, text)

        } catch (error) {
            next(error)
        }
    }

    logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.cookie("token", "", {
                path: "/",
                httpOnly: true,
                expires: new Date(0),
                sameSite: "none",
                secure: true,
            });

            return jsonOne<string>(res, 201, 'Log out successful!');
        } catch (error) {
            next(error)
        }
    }
}