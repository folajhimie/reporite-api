import { User } from "../../../models/People/user";
import { AuthRepository } from "./authService";
import { OtpController } from "../otp/otpService";
import { Request, Response, NextFunction } from "express";
import verifyEmail from "../../../views/verifyEmailTemplate";
import createAccount from "../../../views/createAcccount";
import MailService from "../../../utils/MailService";
import { jsonOne, jsonAll, jsonErrorResponse } from "../../../utils/Reponse";
import { IUserInterface } from "../../../interfaces/People/userInterface";
import { TokenController } from "../token/tokenControllers";
import { OtpType } from "../../../utils/Enums";
import { MailController } from "../../Utility/mailControllers";
import { verifyOtp } from "../../../utils/otp-service";
import { AppError, HttpCode } from "../../../exceptions/appError";
import generateResetPasswordTemplate from "../../../views/resetPasswordTemplate";
import { generateHashPassword } from "../../../utils/password-manager";
import { refreshAuthToken, generateAuthToken } from "../../../utils/token-generator";
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

            //CREATE USER  
            const authRepository: IAuthRepository = new AuthRepository();
            let resultAuth : IUserInterface | any = await authRepository.createUser(
                req
            );

            // Send HTTP-only cookie and Then hash the user details
            // console.log("the way of the user...", resultAuth);
            // sendToken(resultAuth, res)

            // let tokenAuth = sendToken(resultAuth, res)

            // const accesstokenUser = generateAuthToken(resultAuth)
            const refreshtokenUser = refreshAuthToken(res, resultAuth)

            res.cookie('jwt', refreshtokenUser, {
                httpOnly: true, //accessible only by web server 
                secure: true, //https
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
            })

            // console.log("token in the result..", tokenAuth)

            //GENERATE OTP CODE FOR USER
            const otpController = new OtpController();
            let otpType = OtpType.CREATED

            //GENERATE TOKEN FOR THE OTP PAGE TO GET A UNIQUE LINK
            let tokenExpiration = new TokenController();
            let tokenExp = await tokenExpiration.createUniqueToken(resultAuth)

            let { tokenData, sendOtpLink } = tokenExp

            let otpCode = await otpController.createOtp(resultAuth, otpType)

            console.log("all in the middle..", otpCode);

            //SEND VERIFICATION MAIL TO USER 
            const mailController = new MailController();
            const text = 'Welcome To CarTtel';
            let userFirstName = resultAuth?.firstname;
            let userLastName = resultAuth?.lastname;
            let emailStructure = createAccount(otpCode, sendOtpLink, userFirstName, userLastName)
            await mailController.createMail(emailStructure, resultAuth, req, text)

            //SEND MESSAGE TO USER 
            // return jsonOne<UserInterface>(res, 201, resultAuth);

            let responseAuth = {
                resultAuth,
                // accessToken: tokenAuth,
                otpLink: tokenData
            };

            console.log("finished all..", responseAuth);

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
                req.body, req, res
            );

            const accessToken = sendToken(resultAuth, res)

            // Send HTTP-only cookie
            // const accesstokenUser = generateAuthToken(resultAuth)
            const refreshtokenUser = refreshAuthToken(res, resultAuth)

            // res.cookie('refreshtoken', refreshtokenUser, {
            //     secure: true,
            //     httpOnly: true,
            //     path: '/api/v1/auth/refresh',
            //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            // })

            // Create secure cookie with refresh token 
            // res.cookie('jwt', refreshtokenUser, {
            //     httpOnly: true, //accessible only by web server 
            //     secure: true, //https
            //     path: '/',
            //     maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
            // })

            // Send HTTP-only cookie
            res.cookie("jwt", refreshtokenUser, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true,
            });

            // let responseAuth = {
            //     resultAuth,
            //     accessToken: tokenAuth,
            // };

            return jsonOne<string>(res, 200, accessToken);

        } catch (error) {
            next(error);
        }
    }

    logoutUser(req: Request, res: Response) {
        try {
            // res.cookie("token", "", {
            //     path: "/",
            //     httpOnly: true,
            //     expires: new Date(0),
            //     sameSite: "none",
            //     secure: true,
            // });
            const authRepository: IAuthRepository = new AuthRepository();
            authRepository.logout(req, res);
            
    
            return jsonErrorResponse<object>(res, 200, 'Cookies Cleared');

        } catch (error) {
            console.log("all the cookies is getting an error..", error);
        }
    }

    refresh(req: Request, res: Response){
        try {
            const authRepository: IAuthRepository = new AuthRepository();
            let refreshUser =  authRepository.refreshToken(req, res);

            return jsonOne<object | string>(res, 200, refreshUser);
            
        } catch (error) {
            console.log("refresh Token in the code..", error); 
        }
    }

    async userLoginToken(req: Request, res: Response){
        try {
            const authRepository: IAuthRepository = new AuthRepository();
            let userToken =  authRepository.userLoginToken(req, res);

            return jsonOne<object | string>(res, 200, userToken);
            
        } catch (error) {
            res.status(400).send(error);
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
            const tokenAuth = sendToken(resultAuth, res)

            // Send HTTP-only cookie
            res.cookie("token", tokenAuth, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true,
            });

            return jsonOne<object | string>(res, 200, tokenAuth);

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

    
}