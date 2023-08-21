import { IRole } from "./roleInterface";

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
    // getJwtToken: () => string;
    // comparePassword(password: string, hash: string): Promise<boolean>;
}

