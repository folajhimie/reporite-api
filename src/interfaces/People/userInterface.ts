import { IRole } from "./roleInterface";
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IShopInterface } from "../Production/Shop/shopInterface";
import { IProductInterface } from "../Production/Product/productInterface";
import { RoleType } from "../../utils/Enums";

export interface UserInterface {
    username: string;
    password: string;
    email: string;
    phone: string;
    confirmPassword: string;
    avatar: {
        public_id: string;
        secure_url: string;
    };
    role: RoleType;
    isAdmin: Boolean;
    isLocked: Boolean;
    code: string;
    failedLoginAttempts: number;
    active: Boolean;
    userAgent: string[],
    ipAddress: string,
    emailVerified: boolean;
    shopId: Types.ObjectId | IShopInterface | null;
    products: Types.ObjectId[] | IProductInterface[] | null;
    // getJwtToken: () => string;
    // comparePassword(password: string, hash: string): Promise<boolean>;
}

