import { User } from "../../../models/People/user";
import { AuthRepository } from "./authService";
import { OtpController } from "../otp/otpService";
import { Request, Response, NextFunction } from "express";
import verifyEmail from "../../../templates/verifyEmailTemplate";
import MailService from "../../../utils/MailService";
import { jsonOne, jsonAll } from "../../../utils/Reponse";
import { UserInterface } from "../../../interfaces /People/userInterface";
import { TokenController } from "../token/tokenControllers";
import { OtpType } from "../../../utils/Enums";
import { MailController } from "../../Utility/mailControllers";
import { verifyOtp } from "../../../utils/otp-service";
import { AppError, HttpCode } from "../../../exceptions/appError";
import generateResetPasswordTemplate from "../../../templates/resetPasswordTemplate";
import { generateHashPassword } from "../../../utils/password-manager";
import Otp from "../../../models/People/otp";
// import { AuthRepository } from "./authService";
import IAuthRepository from "../../../repositories/People/authRepositories";

// type TodoPreview = Pick<UserInterface, "email" | "password">;

export class AuthController {

    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            // const { username, email, phone, password, confirmPassword } = req.body;

            //CREATE USER  
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.createUser(
                req.body
            )

            //GENERATE OTP CODE FOR USER
            const otpController = new OtpController();
            let otpType = OtpType.VERIFICATION

            //GENERATE TOKEN EXPIRATION 
            let tokenExpiration = new TokenController();
            let tokenExp = await tokenExpiration.tokenExpiration()

            let otpCode = await otpController.createOtp(resultAuth, otpType, tokenExp)

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Verify OTP';
            let emailStructure = verifyEmail(otpCode)
            let mailType = mailController.createMail(emailStructure, resultAuth, req, text)

            //SEND MESSAGE TO USER 
            return jsonOne<UserInterface>(res, 201, resultAuth);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        // const { email, password } = req.body;
        try {
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.loginUser(
                req.body
            )

            //CREATE TOKEN
            const tokenRepository = new TokenController();
            let tokenAuth = await tokenRepository.generateToken(resultAuth);

            let responseAuth = {
                resultAuth,
                accessToken: tokenAuth,
            };

            return jsonOne<object>(res, 200, responseAuth);

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

            //GENERATE TOKEN EXPIRATION 
            let tokenExpiration = new TokenController();
            let tokenExp = await tokenExpiration.tokenExpiration()

            //GENERATE OTP CODE FOR USER
            const otpController = new OtpController();
            let otpType = OtpType.FORGET
            let otpCode = await otpController.createOtp(resultAuth, otpType, tokenExp)

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Reset Password';
            // let emailStructure = verifyEmail(otpCode)
            //GENERATE OTP AND SEND ON MAIL
            const emailStructure = generateResetPasswordTemplate(
                otpCode,
                resultAuth.username
            );
            let mailType = mailController.createMail(emailStructure, resultAuth, req, text)

            return jsonOne<string>(
                res,
                200,
                'Forget Password OTP sent successfully'
            );
        } catch (error) {
            next(error)
        }
    }

    async verifyPassword(req: Request, res: Response, next: NextFunction) {

        try {
            const { email, otp } = req.body

            //VERIFYING EMAIL AND OTP
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.verifyPassword(email, otp)

            //CHECK FOR OTP
            let otptype = OtpType.FORGET
            let isOtpValid = await verifyOtp(resultAuth?.email, otp, otptype);

            if (!isOtpValid) {
                throw new AppError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    description: 'This OTP has expired.'
                });
            }

            return jsonOne<string>(res, 200, 'Able to reset the password');
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp, password } = req.body;

            // VERIFYING IF USER EXIST
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth = await authRepository.resetPassword(email, otp, password);

            const { user } = resultAuth

            //CHECK FOR OTP
            let otptype = OtpType.FORGET
            let isOtpValid = await verifyOtp(user?.email, otp, otptype);

            if (!isOtpValid) {
                throw new AppError({
                    httpCode: HttpCode.UNAUTHORIZED,
                    description: 'This OTP has expired.'
                });
            }

            //ADD NEW PASSWORD 
            const hashPassword = await generateHashPassword(password)
            user.password = hashPassword;
            await user.save();

            await Otp.findByIdAndDelete(isOtpValid)
            return jsonOne<string>(res, 200, 'Password updated successfully');

        } catch (error) {
            next(error)
        }

    }

    logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });

            return jsonOne<string>(res, 201, 'Log out successful!');
        } catch (error) {
            next(error)
        }
    }
}