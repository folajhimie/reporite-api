
// import mongoose, { Document, Model } from 'mongoose';
import { Document, model, Schema, Types } from "mongoose";
import { RequestInterface } from "../../interfaces /Request/requestInterface";

// import User from "../../models/People/user";


export default interface IRequestRepository {
  // createUser(user: User): Promise<User>;
  createRequest(user: Omit<UserInterface, 'avatar'>): Promise<UserInterface>;
  getAllRequests(user: Pick<UserInterface, 'email' | 'password'>): Promise<UserInterface>;
  getRequest(user: UserInterface): Promise<UserInterface>;
  updateRequest(email:string, otp:string): Promise<UserInterface>;
  deleteRequest(email:string, otp:string, password: string): Promise<any>;
  verifyEmail(otp:string, email:string): Promise<void>;
  // logoutUser(): Promise<boolean>;
  // loginUser(user: UserInterface): Promise<UserInterface>;
  // resetPassword(email: string): Promise<boolean>;
  // updatePassword(oldPassword: string, newPassword: string): Promise<boolean>;  
}

  

  