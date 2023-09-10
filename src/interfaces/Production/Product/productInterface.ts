import mongoose, { Document, Schema, Model, Types} from "mongoose";
import { IShopInterface } from "../Shop/shopInterface";
import { UserInterface } from "../../People/userInterface";
import { ICategoryInterface } from "../../Inventory/Category/categoryInterface";
import { IProductRequestInterface } from "../../Request/ProdRequest/prodRequestInterface";


interface IReviewInterface extends Document{
  userId: Types.ObjectId | UserInterface; // You might want to specify the user schema here
  title: string;
  rating: number;
  comment: string;
  productId: Types.ObjectId;
  createdAt?: Date;
}

interface IProductImage {
  public_id: string;
  url: string;
}

interface IProductInterface extends Document {
  name: string;
  description: string;
  tags?: string;
  originalPrice?: number;
  discountPrice: number;
  vendorPrice?: number;
  min_stock?: number;
  max_stock?: number;
  numOfReviews: number,
  stock: number;
  images: IProductImage[];
  reviews: IReviewInterface[];
  ratings?: number;
  shopId: Types.ObjectId | IShopInterface;
  // shop: Record<string, any>; // You might want to specify the shop schema here
  createdBy: Types.ObjectId | UserInterface;
  category: Types.ObjectId | ICategoryInterface;
  productRequest: Types.ObjectId | IProductRequestInterface | null;
  sold_out?: number;
  createdAt: Date;
}

export { IProductInterface, IReviewInterface, IProductImage };


