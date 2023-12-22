import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { generateAuthToken } from './token-generator';
import { IUserInterface } from '../interfaces/People/userInterface';

const sendToken = (user: any, res: Response): string => {
    const token = generateAuthToken(res, user)
    console.log("token in the mud...", token)

    // const token = generateToken(user.username);

    // res.cookie('token', token,  {
    //     path: "/",
    //     httpOnly: true,
    //     expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //     sameSite: "none",
    //     secure: true,
    // })
    // res.status(200).cookie('accessToken', token, {
    //     secure: true,
    //     httpOnly: true,
    //     path: '/api/v1/auth/refresh',
    //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
    // })

    return token       
};

export default sendToken;
