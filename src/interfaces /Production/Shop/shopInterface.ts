import mongoose, { Document, Schema, Model, Types} from "mongoose";
import { IRole } from "../../People/roleInterface";

export interface IShopInterface extends Document {
  name: string;
  description: string;
  phoneNumber: string;
  avatar: string; // Tags might be optional
  productId: Types.ObjectId;
  role: IRole;
  address: string;
}


