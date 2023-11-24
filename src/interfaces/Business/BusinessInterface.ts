import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IPersonnalInterface } from './PersonnalInterface';
import { IProductInterface } from '../Production/Product/productInterface';
import { IUserInterface } from '../People/userInterface';

// Define the Business Schema
export interface IBusinessInterface {
  businessname: string;
  businesstype: string; // individual or corporate business
  businessaccount: boolean;
  businesscategory: string;
  businesscode: string;
  country: string;
  state: string;
  businessaddress: string;
  estimatedmonthly: string;
  businessavatar: {
    public_id: string;
    secure_url: string;
  };
  businessdescription?: string;
  // user: Types.ObjectId | IUserInterface | null;
  // personnal: Types.ObjectId | IPersonnalInterface | null;
  // products: Types.ObjectId[] | IProductInterface[] | null;
}

