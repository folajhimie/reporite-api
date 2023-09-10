
// import mongoose, { Document, Model } from 'mongoose';
import { Document, model, Schema, Types } from "mongoose";
import { UserInterface } from "../../../interfaces/People/userInterface";

// import User from "../../models/People/user";


export default interface IAuthRepository {
  // createUser(user: User): Promise<User>;
  createUser(user: Omit<UserInterface, 'avatar'>): Promise<UserInterface>;
  loginUser(user: Pick<UserInterface, 'email' | 'password'>): Promise<UserInterface>;
  forgotPassword(user: UserInterface): Promise<UserInterface>;
  verifyPassword(email:string, otp:string): Promise<UserInterface>;
  resetPassword(email:string, otp:string, password: string): Promise<any>;
  verifyEmail(otp:string, email:string): Promise<void>;
  // logoutUser(): Promise<boolean>;
  // loginUser(user: UserInterface): Promise<UserInterface>;
  // resetPassword(email: string): Promise<boolean>;
  // updatePassword(oldPassword: string, newPassword: string): Promise<boolean>;  
}

  

  