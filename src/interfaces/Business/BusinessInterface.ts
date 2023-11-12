import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IPersonnalInterface } from './PersonnalInterface';
import { IProductInterface } from '../Production/Product/productInterface';
import { IUserInterface } from '../People/userInterface';

// Define the Business Schema
export interface IBusinessInterface {
  businessName: string;
  businessType: string; // individual or corporate business
  businessAccount: boolean;
  businessCategory: string;
  businessCode: string;
  country: string;
  state: string;
  businessAddress: string;
  estimatedMonthly: string;
  businessAvatar: {
    public_id: string;
    secure_url: string;
  };
  businessDescription: string;
  user: Types.ObjectId | IUserInterface | null;
  personnal: Types.ObjectId | IPersonnalInterface | null;
  products: Types.ObjectId[] | IProductInterface[] | null;
}

