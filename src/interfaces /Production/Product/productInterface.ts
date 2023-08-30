import mongoose, { Document, Schema, Model, Types} from "mongoose";

interface IReview extends Document {
  user: {
    type: object; // You might want to use a specific interface here
  };
  rating: number;
  comment: string;
  productId: string;
  createdAt: Date;
}

export interface IProductInterface extends Document {
  name: string;
  description: string;
  category: string;
  tags?: string; // Tags might be optional
  originalPrice?: number; // Original price might be optional
  discountPrice: number;
  vendorPrice: number;
  stock: number;
  images: string[];
  reviews: IReview[];
  ratings?: number; // Ratings might be optional
  shopId: Types.ObjectId;
  shop: {
    type: object; // You might want to use a specific interface here
    required: true;
  };
  sold_out?: number; // Sold out might be optional
  createdAt: Date;
}


