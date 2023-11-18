// models/Product.ts
import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IProductInterface } from '../Product/productInterface';
import { IUserInterface } from '../../People/userInterface';

interface ICartItemInterface {
    products: Types.ObjectId | IProductInterface;
    quantity: number;
}

interface ICartInterface extends Document {
    user: Types.ObjectId | IUserInterface; // Reference to the user who owns the cart
    items: ICartItemInterface[];
}

export { ICartInterface, ICartItemInterface }









