import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICouponInterface extends Document {
  name: string;
  value: number;
  minAmount?: number;
  maxAmount?: number;
  shopId: string;
  selectedProduct?: string;
  createdAt: Date;
}


