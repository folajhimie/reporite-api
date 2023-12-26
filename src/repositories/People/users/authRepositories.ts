
// import mongoose, { Document, Model } from 'mongoose';
import { Document, model, Schema, Types } from "mongoose";
import { IUserInterface } from "../../../interfaces/People/userInterface";

// import User from "../../models/People/user";


export default interface IAuthRepository {
  // createUser(user: User): Promise<User>;
  createUser(req: any): Promise<IUserInterface | void>;
  loginUser(user: Pick<IUserInterface, 'email' | 'password'>, req: any, res: any): Promise<any>;
  sendLoginCode(user: Pick<IUserInterface, 'email'>): Promise<Record<string, string | any>>;
  loginWithCode(req: any): Promise<Record<string, any>>;
  forgotPassword(user: IUserInterface): Promise<any>;
  resetPassword(req: any): Promise<any>;
  verifyUserWithOTP(req: any): Promise<any>;
  resendOTP(req: any): Promise<any>;
  loginWithGoogle(req: any): Promise<any>; 
  logout(req: any, res: any): any;
  refreshToken(req: any, res: any): any;
  userLoginToken(req: any, res: any): any;
}

  

  