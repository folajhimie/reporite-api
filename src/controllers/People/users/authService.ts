import IAuthRepository from "../../../repositories/People/users/authRepositories";
import { Document, model, Schema, Types } from "mongoose";
import { User } from "../../../models/People/user";
import { IUserInterface } from "../../../interfaces/People/userInterface";
import { AppError, HttpCode } from "../../../exceptions/appError";
// import Role from "../../../models/People/roles";
// import { RoleType } from "../../../utils/Enums";
import { generateHashPassword, comparePassword, compareEmail } from "../../../utils/password-manager";
import Otp from "../../../models/Utility/otp";
// import cloudinary from 'cloudinary';
// import { validateUser } from "../../../validator/user/userValidator";
import { HelpFunction } from "../../../Helpers/helpFunction";
import UAParser from 'ua-parser-js';
import { encrypt, decrypt, hashToken, createRandomToken } from "../../../utils/password-manager";
import { Token } from "../../../models/Utility/token";
import { generateOtp } from "../../../utils/otp-service";
import IOtp from "../../../interfaces/Utility/otpInterface";
import { OAuth2Client } from 'google-auth-library';
import { validateCreateUser, validateLoginUser } from "../../../validator/user/AuthValidator";

import { CloudinaryService } from "../../../utils/Cloudinary";

import dotenv from "dotenv";
dotenv.config();



// import parser from 'ua-parser-js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export class AuthRepository implements IAuthRepository {
    async loginWithGoogle(req: any): Promise<any>{
        try {
            const { userToken } = req.body;

            const ticket = await client.verifyIdToken({
                idToken: userToken,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });


            const payload: any = ticket.getPayload();

            const { firstName, email, picture, sub } = payload;

            const password = Date.now() + sub;

            // Get User Device Details
            const parser = new UAParser();
            const uaString = req.headers["user-agent"] || ''; // Ensure you handle the case where user-agent is undefined
            const ua = parser.setUA(uaString).getResult();
            const userAgentData: string[] = [ua.ua];

            // FIND ALL USERS TO GET THE USER CODE
            const users = await User.find();

            // The function for getting the user code number
            const getUserCode: string | number = HelpFunction.addZeroToSingleDigit(users.length)

            const userCode: string = `CRT/USR/${getUserCode}`;

            // Get the user's IP address from the request object
            const ipAddressData = req.ip; // This gets the user's IP address

            // Check if the user exists
            let user = await User.findOne({ email });

            if (user) {
                throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: 'This user already exist!' });
            }

            // User doesn't exist, register user
            if (!user) {
                // Create a new user
                user = await User.create({
                    firstName,
                    email,
                    password,
                    isVerified: true,
                    avatar: picture,
                    code: userCode,
                    ipAddress: ipAddressData,
                    userAgent: userAgentData
                });
            }

            return user
            
        } catch (error) {
            console.error('Error creating using Google:', error); 
        }
    }

    async createUser(req: any): Promise<any> {
        
        try {
            // Validate user input
            await validateCreateUser(req);
            
            const { 
                firstName, 
                lastName, 
                email, 
                phone, 
                password, 
                confirmPassword, 
                avatar, 
                roles 
            } = req.body as IUserInterface;

            //compare password to see if they match
            if (password !== confirmPassword) {
                throw new AppError({ 
                    httpCode: HttpCode.FORBIDDEN, 
                    description: 'password and confirmPassword do not match!' 
                });
            }

            //  Query to get all users 
            const users: IUserInterface | any = await User.find();

            // The function for getting the user code number
            const getUserCode: string | number = HelpFunction.addZeroToSingleDigit(users.length)

            const userCode: string = `CRT/USR/${getUserCode}`;

            // Check if user with email already exists
            const existingUser = await User.findOne({ email }).exec();

            if (existingUser) {
                throw new AppError({ 
                    httpCode: HttpCode.UNAUTHORIZED, 
                    description: 'User with email already exists.. Authentication failed' 
                });
            }

            if (!req.file) {
                throw new AppError({ 
                    httpCode: HttpCode.NOT_FOUND, 
                    description: 'No File Uploaded!' 
                });
            }

            // Creating a user image which would be uploaded in cloudinary
            const userImage = await CloudinaryService.uploadImage(req.file.buffer.toString('base64'), "users");

            //GENEARTE ENCRYPTION PASSWORD
            const hashPassword = generateHashPassword(password);
            // (await hashPassword).toString

            // Get the user's IP address from the request object
            const ipAddressData = req.ip; // This gets the user's IP address

            // Get User Device Details
            const parser = new UAParser();
            const uaString = req.headers["user-agent"] || ''; // Ensure you handle the case where user-agent is undefined
            const ua = parser.setUA(uaString).getResult();
            const userAgentData: string[] = [ua.ua];

            // Create a new shop with the image URL and IP Address 
            let newUser = new User({
                firstName,
                lastName,
                email,
                phone,
                password: hashPassword,
                avatar: userImage,
                roles,
                code: userCode,
                ipAddress: ipAddressData,
                userAgent: userAgentData
            })

            let savedUser = await newUser.save();
            // this.users.push(newUser);
            return savedUser

        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    async loginUser({ email, password }: Pick<IUserInterface, 'email' | 'password'>, req: any): Promise<any> {
        try {
            //verifying if content exist
            if (!email || !password) {
                throw new AppError({ httpCode: HttpCode.NO_CONTENT, description: 'Input form is empty' });
            }

            // const existingUser = await getUserByEmail(email);

            const user = await User.findOne({ email }).exec();

            if (!user) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User with email already existsAuthentication failed' });
            }

            const isValidUser = await comparePassword(password, user.password);

            const isValidEmail = compareEmail(email, user.email);

            // Check if user with email already exists
            // if (!isValidEmail || !isValidUser) {
            //     throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'You have entered an invalid email address or password' });
            // }

            // Get User Device Details
            const parser = new UAParser();
            const uaString = req.headers["user-agent"] || ''; // Ensure you handle the case where user-agent is undefined
            const ua = parser.setUA(uaString).getResult();
            const thisUserAgent: string = ua.ua;
            console.log(thisUserAgent);

            const allowedDevice = user.userAgent.includes(thisUserAgent);

            if (!allowedDevice) {
                // const loginCode: number = Math.floor(100000 + Math.random() * 900000);
                const loginCode: string = generateOtp(4);

                // Hash token before saving to DB
                const encryptedLoginCode = encrypt(loginCode.toString());

                // Delete token if it exists in DB
                let userToken = await Token.findOne({ userId: user._id });

                if (userToken) {
                    await userToken.deleteOne();
                }

                // Save Access Token to DB
                await new Token({
                    userId: user._id,
                    loginToken: encryptedLoginCode,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + 60 * (60 * 1000), // Thirty minutes
                }).save();

                throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'Check your email for login code' });
            }

            // const userAgentData: string[] = [ua.ua];

            //CHECK IF USER IS ACTIVE
            if (!user.active) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Please User has been deactivated' });
            }

            //CHECK FOR USER VERIFIED AND EXISTING 
            if (!user.isVerified) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Please confirm your account by confirmation email OTP and try again' });
            }

            // Check if the user account is locked
            if (user.isLocked === true) {
                throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: 'Account is locked' });
            }

            // Perform your authentication logic here (e.g., checking the password)

            // If authentication fails, increment the failedLoginAttempts
            if (!isValidEmail || !isValidUser) {
                user.failedLoginAttempts++;

                // Check if the user has reached the maximum failed login attempts
                if (user.failedLoginAttempts >= 6) {
                    user.isLocked = true;
                    user.failedLoginAttempts = 0; // Reset the failed login attempts

                    await user.save();

                    throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: 'Account is locked due to too many failed login attempts' });
                }

                await user.save();

                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Authentication failed' });
            }

            // If authentication succeeds, reset the failed login attempts
            user.failedLoginAttempts = 0;
            await user.save();

            return user;

        } catch (error) {
            console.error('Error Login user:', error);
        }
    }

    async sendLoginCode(user: Pick<IUserInterface, "email">): Promise<Record<string, any>> {
        try {
            const { email } = user;

            const userData = await User.findOne({ email }).exec();

            if (!userData) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User not found!' });
            }

            // Find Access Token in DB
            let userToken = await Token.findOne({ userId: userData._id });

            if (!userToken) {
                throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'Invalid or Expired token, Login again!' });
            }

            // get the login code
            const loginCode = userToken.loginToken;
            const decryptedLoginCode = decrypt(loginCode); // This value has four figures
            console.log("getting the Token...", loginCode, decryptedLoginCode);

            const resultAuth = {
                userData,
                hashTokenData: decryptedLoginCode,
            };
            return resultAuth;

        } catch (error) {
            console.error('Error in sending Login user:', error);
            throw error; // Re-throw the error to be caught by the calling function or middleware
        }
    }

    async loginWithCode(req: any): Promise<Record<string, string | any>> {
        try {
            const { email } = req.params;
            const { loginCode } = req.body;
            console.log("first", email, loginCode);

            const user = await User.findOne({ email }).exec();

            if (!user) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User not found!' });
            }

            // Find Access Token in DB
            let userToken = await Token.findOne({
                userId: user._id,
                expiredAt: { $gt: Date.now() },
            });

            if (!userToken) {
                throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'Invalid or Expired token, Login again!' });
            }

            const decryptedLoginCode = decrypt(userToken.loginToken);

            // Log user in
            if (loginCode !== decryptedLoginCode) {
                throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'Incorrect login code, please try again!' });
            }

            const parser = new UAParser();
            const uaString = req.headers["user-agent"] || ''; // Ensure you handle the case where user-agent is undefined
            const ua = parser.setUA(uaString).getResult();
            const thisUserAgent: string = ua.ua;

            user.userAgent.push(thisUserAgent);
            await user.save();

            console.log(thisUserAgent);

            return user


        } catch (error) {
            console.error('Error in Login with code user:', error);
            throw error;
        }
    }

    // FORGOT PASSWORD
    async forgotPassword({ email }: IUserInterface): Promise<any> {

        try {
            const user = await User.findOne({ email }).exec();

            if (!user) {
                throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'User not found!' });
            }

            // Delete token if it exists in DB
            let token = await Token.findOne({ userId: user._id });

            if (token) {
                await token.deleteOne();
            }

            // create reset Token 
            const resetToken = createRandomToken(user._id);

            // Hash token before saving to DB
            const hashedTokenData = hashToken(resetToken)

            // Save Token to DB
            await new Token({
                userId: user._id,
                token: hashedTokenData,
                createdAt: Date.now(),
                expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
            }).save();

            // Construct Reset Url
            const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

            // const resetPasswordUrl = `${req.protocol}://${req.get(
            //     "host"
            // )}/password/reset/${resetToken}`;

            console.log(resetUrl);

            const resultAuth = {
                user,
                resetUrl
            }

            return resultAuth

        } catch (error) {
            console.error('Error in Forgot password code:', error);
            // throw error; 
        }

    }

    async resetPassword(req: any): Promise<any> {
        try {
            const { password, confirmPassword } = req.body;
            const { resetToken } = req.params;

            // Hash token, then compare to Token in DB
            const hashedToken = hashToken(resetToken);

            // Find Token in DB
            const userToken = await Token.findOne({
                token: hashedToken,
                expiresAt: { $gt: Date.now() },
            });

            if (!userToken) {
                throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: 'Reset password url is invalid or has been expired!' });
            }

            if (password !== confirmPassword) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Password is not matched with the new password!' });
            }

            // Find user and reset password
            let user: IUserInterface | any = await User.findOne({ _id: userToken.userId })

            user.password = password;

            await user.save();

        } catch (error) {
            console.error('Error in Reset password code:', error);
        }


    }

    async verifyUserWithOTP(req: any): Promise<any> {
        try {

            const { uniqueString } = req.params;
            const { otp } = req.body;

            const decipherLink: string = decrypt(uniqueString)

            // FIND UNIQUE LINK TO THE USER 
            const findToken = await Token.findOne({ uniqueToken: decipherLink }).exec();

            // CHECK IF THE TOKEN STILL EXIST 
            if (!findToken) {
                throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'Sorry Token was not found!' });
            }

            const user = await User.findOne({ _id: findToken.userId }).exec();

            // CHECK IF THE USER STILL EXIST 
            if (!user) {
                throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'User was not found!' });
            }

            // const otpCode = await Otp.findOne({ _id: findToken.userId }).exec();

            const otpResult = {
                user, 
                otp
            }

            return otpResult;

           

            

        } catch (error) {
            console.error('Error in verifying user with OTP code:', error);
        }
    }

    async resendOTP(req: any): Promise<any> {
        try {
            const { uniqueString } = req.params;

            const decipherLink: string = decrypt(uniqueString)

            // FIND UNIQUE LINK TO THE USER 
            const findToken = await Token.findOne({ uniqueToken: decipherLink }).exec();

            // CHECK IF THE TOKEN STILL EXIST 
            if (!findToken) {
                throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'Sorry Token was not found!' });
            }

            const user = await User.findOne({ _id: findToken.userId }).exec();

            // CHECK IF THE USER STILL EXIST 
            if (!user) {
                throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'User was not found!' });
            }

            const otpCode = await Otp.findOne({ userId: user._id }).exec();

            // IF OTP EXIST THEN DELETE IT 
            if (otpCode) {
                await otpCode.deleteOne();
            }

            return user;
            
        } catch (error) {
            console.error('Error in re-sending OTP code:', error); 
        }
    }

}

