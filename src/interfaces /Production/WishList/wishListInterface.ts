import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IWishListInterface extends Document {
  user: Types.ObjectId;
  products: Types.ObjectId[];
}


