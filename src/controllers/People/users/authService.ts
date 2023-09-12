import IAuthRepository from "../../../repositories/People/users/authRepositories";
// import { Document, model, Schema, Types } from "mongoose";
import { User, getUserByEmail } from "../../../models/People/user";
import { UserInterface } from "../../../interfaces/People/userInterface";
import { AppError, HttpCode } from "../../../exceptions/appError";
// import Role from "../../../models/People/roles";
import { RoleType } from "../../../utils/Enums";
import { generateHashPassword, comparePassword, compareEmail } from "../../../utils/password-manager";
import Otp from "../../../models/People/otp";
import cloudinary from 'cloudinary';
import { validateUser } from "../../../validator/user/userValidator";
import { HelpFunction } from "../../../Helpers/helpFunction";
import UAParser from 'ua-parser-js';




// import { OtpType } from "../../../utils/Enums";


export class AuthRepository implements IAuthRepository {

    async createUser(req: any): Promise<any> {
        const users = await User.find();

        const { username, email, phone, password, confirmPassword, avatar, role } = req.body;

        //verifying if content exist
        if (!username || !email || !phone || !password || !confirmPassword) {
            throw new AppError({ httpCode: HttpCode.NO_CONTENT, description: 'Input form is empty' });
        }

        //compare password to see if they match
        if (password !== confirmPassword) {
            throw new AppError({ httpCode: HttpCode.FORBIDDEN, description: 'password and confirmPassword do not match!' });
        }

        // validate the user info to check if user is correct
        const validationError = validateUser({
            username,
            phone,
            email,
            password,
            confirmPassword,
        });

        if (validationError) {
            throw new AppError({ httpCode: HttpCode.BAD_REQUEST, description: validationError });
        }

        // The function for getting the user code number
        const getUserCode: string | number = HelpFunction.addZeroToSingleDigit(users.length)

        const userCode: string = `CRT/USR/${getUserCode}`;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email }).exec();

        if (existingUser) {
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User with email already exists.. Authentication failed' });
        }


        //get role form the model
        // const role = await Role.findOne({ name: RoleType.ADMIN }).exec();
        // if (!role) {
        //     throw new AppError({
        //         httpCode: HttpCode.UNPROCESSABLE,
        //         description: 'User role not found'
        //     });
        // }

        if (!req.file) {
            throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'No File Uploaded!' });
        }

        // Creating a user image which would be uploaded in cloudinary
        const userImage = await cloudinary.v2.uploader.upload(req.file.buffer.toString('base64'));

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
            username,
            email,
            phone,
            password: hashPassword,
            avatar: userImage.secure_url,
            role,
            code: userCode,
            ipAddress: ipAddressData,
            userAgent: userAgentData
        })

        let savedUser = await newUser.save();
        // this.users.push(newUser);
        return savedUser
    }

    async loginUser({ email, password }: Pick<UserInterface, 'email' | 'password'>): Promise<UserInterface> {
        //verifying if content exist
        if (!email || !password) {
            throw new AppError({ httpCode: HttpCode.NO_CONTENT, description: 'Input form is empty' });
        }

        // const existingUser = await getUserByEmail(email);

        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User with email already existsAuthentication failed' });
        }

        const isValidUser = await comparePassword(password, user.password);

        const isValidEmail = compareEmail(email, user.email);

        // Check if user with email already exists
        // if (!isValidEmail || !isValidUser) {
        //     throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'You have entered an invalid email address or password' });
        // }

        //CHECK IF USER IS ACTIVE
        if (user.active === false) {
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'Please User has been deactivated' });
        }

        //CHECK FOR USER VERIFIED AND EXISTING 
        if (!user.emailVerified) {
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
    }


    async forgotPassword({ email }: UserInterface): Promise<UserInterface> {

        const existingUser = await getUserByEmail(email);

        //CHECK FOR USER VERIFIED AND EXISTING 
        if (!existingUser?.emailVerified) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Please confirm your account by confirmation email OTP and try again',
            });
        }

        // Check if user with email already exists
        if (!existingUser) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'You have entered an invalid email address or password',
            });
        }

        // RETURN THE OBJECT RESPONSE
        // const responseType = {
        //     user: existingUser,
        //     otp: OtpType.FORGET
        // }

        return existingUser;

    }

    async verifyPassword(email: string, otp: string): Promise<UserInterface> {

        let user = await getUserByEmail(email);

        //IF USER NOT EXISTS
        if (!user) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'You have entered an invalid email address.'
            });
        }
        return user
    }

    async resetPassword(email: string, otp: string, password: string): Promise<any> {

        let user = await User.findOne({ email }).exec();

        //CHECK IF THE USER EXIST
        if (!user) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'You have entered an invalid email address.'
            });
        }
        const responseUser = {
            user,
            otp,
            password
        }
        return responseUser
    }

    async verifyEmail(otp: string, email: string): Promise<void> {

        let user = await User.findOne({ email }).exec();

        let userId = user?._id

        //CHECK IF USER EXIST
        if (!user) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND,
                description: 'User not Found.'
            });
        }

        const otpCode = await Otp.findById({ userId }).exec();

        // CHECK IF OTP CODE IS IN OTP TABLE
        if (otpCode?.otp !== otp) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND,
                description: 'Invalid Otp Code'
            });
        }

        if (otpCode?.otpExpiration < new Date()) {
            throw new AppError({
                httpCode: HttpCode.FORBIDDEN,
                description: 'Otp Expired'
            });
        }

        await User.updateOne(
            {
                email,
            },
            {
                isEmailVerified: true,
            },
        )
    }
}