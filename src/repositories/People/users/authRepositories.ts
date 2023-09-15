
// import mongoose, { Document, Model } from 'mongoose';
import { Document, model, Schema, Types } from "mongoose";
import { UserInterface } from "../../../interfaces/People/userInterface";

// import User from "../../models/People/user";


export default interface IAuthRepository {
  // createUser(user: User): Promise<User>;
  createUser(req: any): Promise<any>;
  loginUser(user: Pick<UserInterface, 'email' | 'password'>, req: any): Promise<any>;
  sendLoginCode(user: Pick<UserInterface, 'email'>): Promise<Record<string, string | any>>;
  loginWithCode(req: any): Promise<Record<string, any>>;
  forgotPassword(user: UserInterface): Promise<any>;
  resetPassword(req: any): Promise<any>;
  verifyUserWithOTP(req: any): Promise<any>;

  verifyPassword(email:string, otp:string): Promise<UserInterface>;
  verifyEmail(otp:string, email:string): Promise<void>;
  // logoutUser(): Promise<boolean>;
  // loginUser(user: UserInterface): Promise<UserInterface>;
  // resetPassword(email: string): Promise<boolean>;
  // updatePassword(oldPassword: string, newPassword: string): Promise<boolean>;  
}

  

  