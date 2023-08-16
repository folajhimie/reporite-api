// import { IRole } from "./roleInterface";

export interface IUser{
    username: string;
    password: string;
    email: string;
    phone: String;
    // tokens: { token: string }[];
    role: string[] | string;
    businessName: String;
    avatar?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isAdmin: Boolean;
    active: Boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    getJwtToken: () => string;
    comparePassword(password: string, hash: string): Promise<boolean>;
}

