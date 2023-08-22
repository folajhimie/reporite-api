import IAuthRepository from "../../../repositories/People/users/authRepositories";
// import { Document, model, Schema, Types } from "mongoose";
import { User, getUserByEmail } from "../../../models/People/user";
import { UserInterface } from "../../../interfaces /People/userInterface";
import { AppError, HttpCode } from "../../../exceptions/appError";
import Role from "../../../models/People/roles";
import { RoleType } from "../../../utils/Enums";
import { generateHashPassword, comparePassword } from "../../../utils/password-manager";
import Otp from "../../../models/People/otp";

// import { OtpType } from "../../../utils/Enums";


export class AuthRepository implements IAuthRepository {
    
    async createUser(user: Omit<UserInterface, 'avatar'>): Promise<UserInterface> {

        const { username, email, phone, password, confirmPassword } = user;

        //verifying if content exist
        if (!username || !email || !phone || !password || !confirmPassword) {
            throw new AppError({
                httpCode: HttpCode.NO_CONTENT,
                description: 'Input form is empty'
            });
        }

        //compare password to see if they match
        if (password !== confirmPassword) {
            throw new AppError({
                httpCode: HttpCode.FORBIDDEN,
                description: 'password and confirmPassword do not match!'
            });
        }

        // Check if user with email already exists
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'User with email already existsAuthentication failed'
            });
        }

        //get role form the model
        const role = await Role.findOne({ name: RoleType.ADMIN }).exec();
        if (!role) {
            throw new AppError({
                httpCode: HttpCode.UNPROCESSABLE,
                description: 'User role not found'
            });
        }

        //GENEARTE ENCRYPTION PASSWORD
        const hashPassword = generateHashPassword(password);
        // (await hashPassword).toString

        //CREATE USER 
        let newUser = new User({
            username,
            email,
            phone,
            password: hashPassword,
            role: role._id
        })
        let savedUser = await newUser.save();

        // this.users.push(newUser);

        return savedUser
    }
 
    async loginUser({email, password}: Pick<UserInterface, 'email' | 'password'>): Promise<UserInterface>{
        //verifying if content exist
        if (!email || !password ) {
            throw new AppError({ 
                httpCode: HttpCode.NO_CONTENT, 
                description: 'Input form is empty' 
            }); 
        }

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'User with email already existsAuthentication failed' 
            });
        }
        
        const isValidUser = await comparePassword(password, existingUser.password);

        //CHECK IF USER IS ACTIVE
        if (existingUser.active === false) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'Please User has been deactivated',
            });
        }
        
        //CHECK FOR USER VERIFIED AND EXISTING 
        if (!existingUser.isEmailVerified) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'Please confirm your account by confirmation email OTP and try again',
            });
        }
        
        // Check if user with email already exists
        if (!existingUser || !isValidUser) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'You have entered an invalid email address or password',
            });
        }

        return existingUser;
    }

    async forgotPassword({ email }: UserInterface): Promise<UserInterface> {

        const existingUser = await getUserByEmail(email);

        //CHECK FOR USER VERIFIED AND EXISTING 
        if (!existingUser?.isEmailVerified) {
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

    async verifyPassword(email:string, otp:string): Promise<UserInterface> {

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

    async resetPassword(email:string, otp:string, password: string): Promise<any>{

        let user = await User.findOne({ email}).exec();

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

    async verifyEmail(otp:string, email:string): Promise<void> {

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