import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { jsonErrorResponse, jsonOne } from "./Reponse";
import { IUserInterface } from "../interfaces/People/userInterface";
import { User } from "../models/People/user";
dotenv.config();

// JWT TOKEN
export const generateAuthToken = (res: any, user: object | any) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";
  console.log("all the secret..", secret);
  const accessToken = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: user.roles,
      // phone: user.phone,
    },
    secret,
    {
      expiresIn: "15m",
    }
  );

  // res.cookie('accessToken', accessToken, {
  //   httpOnly: true, //accessible only by web server 
  //   secure: true, //https
  //   path: '/',
  //   sameSite: 'None', //cross-site cookie 
  //   maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  // })

  return accessToken
};

export const refreshAuthToken = (res: any, user: object | any) => {
  const secret = process.env.REFRESH_TOKEN_SECRET || "your_jwt_secret";
  console.log("all the refresh secret..", secret);
  const refreshToken = jwt.sign(
    {
      email: user.email,
      roles: user.roles,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
  console.log('refresh User in the Code..', refreshToken);

  // Create secure cookie with refresh token 
  // res.cookie('jwt', refreshToken, {
  //   httpOnly: true, //accessible only by web server 
  //   secure: true, //https
  //   path: '/',
  //   sameSite: 'None', //cross-site cookie 
  //   maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  // })
};

export const decodeAuthToken = (res: any, refreshToken: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";

  return jwt.verify(
    refreshToken,
    secret,
    async (err, decoded: object | any) => {
      if (err) {
        return jsonErrorResponse<object>(res, 403, "User Forbidden");
      }

      const foundUser: IUserInterface | any = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser) {
        return jsonErrorResponse<object>(res, 401, "User Unauthorized");
      }

      const accessToken = jwt.sign(
        {
          _id: foundUser._id,
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
          email: foundUser.email,
          roles: foundUser.roles,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: "15m",
        }
      );

      return accessToken

    }
  );
};

export const generateAuthLoginToken = (res: any, user: object | any) => {

  const accessSecret = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";
  console.log("all the secret..", accessSecret);

  const accessToken = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: user.roles,
    },
    accessSecret,
    {
      expiresIn: "10s",
    }
  );

  const secretRefresh = process.env.REFRESH_TOKEN_SECRET || "your_jwt_secret";

  const newRefreshToken = jwt.sign(
    { 
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      roles: user.roles,
    },
    secretRefresh,
    { expiresIn: '5d' }
);

  
}; 
