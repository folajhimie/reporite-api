import mongoose, { Document, Schema, Model } from "mongoose";

export interface IWishListInterface extends Document {
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
    userId: string;
    productId: string;
    Stock: number;
}


