import mongoose, { Document, Schema, Model, Types} from "mongoose";
import { IShopInterface } from "../Shop/shopInterface";
interface IReview extends Document{
  user: Types.ObjectId; // You might want to specify the user schema here
  name: string;
  rating: number;
  comment: string;
  productId: string;
  createdAt?: Date;
}

interface IProductImage {
  public_id: string;
  url: string;
}

interface IProductInterface extends Document {
  name: string;
  description: string;
  category: string;
  tags?: string;
  originalPrice?: number;
  discountPrice: number;
  vendorPrice?: number;
  min_stock?: number;
  max_stock?: number;
  numOfReviews: number,
  stock: number;
  images: IProductImage[];
  reviews: IReview[];
  ratings?: number;
  shopId: Types.ObjectId | IShopInterface;
  shop: Record<string, any>; // You might want to specify the shop schema here
  createdBy: Types.ObjectId;
  sold_out?: number;
  createdAt: Date;
}

export { IProductInterface, IReview, IProductImage };


