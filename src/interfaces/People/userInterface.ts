// import { IRole } from "./roleInterface";
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IShopInterface } from "../Production/Shop/shopInterface";
import { IProductInterface } from "../Production/Product/productInterface";
import { IRoleInterface } from "./roleInterface";
import { IBusinessInterface } from '../Business/BusinessInterface';

export interface IUserInterface {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    phone: string;
    confirmPassword: string;
    avatar: {
        public_id: string;
        secure_url: string;
    };
    code: string;
    // roles: Types.ObjectId | IRoleInterface | null;
    roles: String;
    isVerified: Boolean; // This is where you send your SECURITY CODE to the user account
    isLocked: Boolean; // This is to restrict your account from functioning normally
    securityCode: string;
    failedLoginAttempts: number;
    active: Boolean; // This is where a user is either suspended, deactivated or blocked meaning he cant login into his account and this happens where you exceed ur failed attempt 
    userAgent: string[],
    ipAddress: string,
    isCompleted: boolean; // This is to checked if you filled all your required Business information..  
    // business?: Types.ObjectId | IBusinessInterface | null;
    // getJwtToken: () => string;
    // comparePassword(password: string, hash: string): Promise<boolean>;
}

