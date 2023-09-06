// import mongoose, { Document, Schema, Model } from "mongoose";
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IProductInterface } from '../../Production/Product/productInterface';


interface ICategoryInterface extends Document {
  name: string;
  // description?: string;
  products: Types.ObjectId[] | IProductInterface[];
}

export { ICategoryInterface };


