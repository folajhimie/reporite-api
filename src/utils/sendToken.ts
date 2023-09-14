import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { generateAuthToken } from './token-generator';
import { UserInterface } from '../interfaces/People/userInterface';

const sendToken = (user: any, res: Response): string => {
    const token = generateAuthToken(user?._id)

    // const token = generateToken(user.username);

    res.cookie('token', token,  {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    })

    return token       
};

export default sendToken;
