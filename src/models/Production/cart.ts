import { Document, model, Schema, Types } from "mongoose";

/**
 * Interface to model the Cart Schema for TypeScript.
 * @param productName: string;
 * @param productPrice: number;
 * @param productImage: string;
 * @param quantity: number;
 * @param userId: string,
 * @param productId: number,
 * @param stock: number,
 */


export interface Cart extends Document {
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
    userId: string,
    productId: number,
    stock: number,
}

const cartSchema: Schema = new Schema({
    productName: {
        type: String,
        required: [true, "Please enter your product name"],
    },
    productPrice: {
        type: Number,
        required: [true, "Please enter your product price"],
    },
    productImage: {
        type: String,
        required: [true, "Please enter your product image"],
    },
    quantity: {
        type: Number,
        required: [true, "Please enter your product quantity"],
    },
    userId: {
        type: String,
        required: [true, "Please enter your user id"],
    },
    productId: {
        type: String,
        required: [true, "Please enter your user id"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your product stock"],
    }
});

export default model<Cart>('Cart', cartSchema);



