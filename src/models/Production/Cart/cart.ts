import mongoose, { Document, Schema, Model } from "mongoose";
import { ICartInterface } from "../../../interfaces /Production/Cart/cartInterface";

interface Cart extends ICartInterface, Document { }

const cartSchema: Schema = new Schema<ICartInterface>(
    {
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
            required: [true, "Please enter your product id"],
        },
        Stock: {
            type: Number,
            required: [true, "Please enter your product stock"],
        },
    },
    { timestamps: true }
);

const Cart: Model<ICartInterface> = mongoose.model<Cart>("Cart", cartSchema);
export default Cart;