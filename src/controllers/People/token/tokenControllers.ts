import { JwtPayload } from "jsonwebtoken";
// import { HttpCode, AppError } from "../../../exceptions/appError";
import { generateAuthToken, decodeAuthToken } from "../../../utils/token-generator";
import { Token } from "../../../models/Utility/token";
import { IUserInterface } from "../../../interfaces/People/userInterface";
import { uuid } from 'uuidv4';
// import crypto from 'crypto';
import { encrypt } from "../../../utils/password-manager";
import dotenv from "dotenv";
dotenv.config();

export class TokenController {

    async generateToken (user: any): Promise<string> {
        //GENERATE TOKEN FOR USER
        const token = generateAuthToken(user._id)
        return token 
    }

    decodedToken (token:string): string | JwtPayload {
        //VERIFYING TOKEN
        const tokenHolder = decodeAuthToken(token)
        return tokenHolder;
    }

    // async tokenExpiration(){
    //     let tokenExpiration: any = new Date();

    //     tokenExpiration = tokenExpiration.setMinutes(
    //         tokenExpiration.getMinutes() + 10
    //     );

    //     return tokenExpiration
    // }

    async tokenExpiration(){
        let tokenExpiration: any = new Date();
        
        const expiryDate = new Date(tokenExpiration.getTime() + 30 * 60 * 1000); // Add 30 minutes in milliseconds
      
        return expiryDate;
    }

    async createUniqueToken (user: IUserInterface| any): Promise<string | any> {
        try {

            const uniqueString = uuid() + user._id;

            // Hash token before saving to DB
            const encryptedUniqueToken = encrypt(uniqueString.toString());

            // Construct Reset Url
            const sendOtpLink = `${process.env.FRONTEND_URL}/send-otp/${uniqueString}`;

            // Delete token if it exists in DB
            let userToken = await Token.findOne({ userId: user._id });

            // If user Token already exist delete it 
            if (userToken) {
                await userToken.deleteOne();
            }

            // Save Access Token to DB
            const tokenData = await new Token({
                userId: user._id,
                uniqueToken: encryptedUniqueToken,
                createdAt: Date.now(),
                expiresAt: Date.now() + 60 * (60 * 1000), // Thirty minutes
            }).save();

            const sendOtp = {
                tokenData,
                sendOtpLink
            }

            return sendOtp;
            
        } catch (error) {
            console.error('Error in creating unique string Token:', error); 
        } 
    }

    
      
}

