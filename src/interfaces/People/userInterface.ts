import { IRole } from "./roleInterface";
import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface UserInterface{
    username: string;
    password: string;
    email: string;
    phone: string;
    confirmPassword: string;
    avatar: string;
    role: IRole;
    isAdmin: Boolean;
    active: Boolean;
    isEmailVerified: boolean;
    organization_id: Types.ObjectId;
    request_id: Types.ObjectId;
    // getJwtToken: () => string;
    // comparePassword(password: string, hash: string): Promise<boolean>;
}

