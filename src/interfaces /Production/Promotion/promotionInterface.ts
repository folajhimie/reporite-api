// models/Promotion.ts
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IProductInterface } from '../Product/productInterface';

export interface IPromotionInterface extends Document {
    productId: Types.ObjectId | IProductInterface;
    discountPercentage: number;
    // ... other promotion fields
}


