import { JwtPayload } from "jsonwebtoken";
// import { HttpCode, AppError } from "../../../exceptions/appError";
import { generateAuthToken, decodeAuthToken } from "../../../utils/token-generator";


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

    async tokenExpiration(){
        let tokenExpiration: any = new Date();

        tokenExpiration = tokenExpiration.setMinutes(
            tokenExpiration.getMinutes() + 10
        );

        return tokenExpiration
    }
}

