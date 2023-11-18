
// import mongoose, { Document, Model } from 'mongoose';
import { Document, model, Schema, Types } from "mongoose";
import { RequestInterface } from "../../interfaces/Request/requestInterface";
import { IUserInterface } from "../../interfaces/People/userInterface";
// import User from "../../models/People/user";


export default interface IRequestRepository {
  // createUser(user: User): Promise<User>;
  createRequest(user: Omit<IUserInterface, 'avatar'>): Promise<IUserInterface>;
  getAllRequests(user: Pick<IUserInterface, 'email' | 'password'>): Promise<IUserInterface>;
  getRequest(user: IUserInterface): Promise<IUserInterface>;
  updateRequest(email:string, otp:string): Promise<IUserInterface>;
  deleteRequest(email:string, otp:string, password: string): Promise<any>;
  verifyEmail(otp:string, email:string): Promise<void>;  
}

  

  