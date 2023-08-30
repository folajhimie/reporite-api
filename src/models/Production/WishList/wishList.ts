import mongoose, { Document, Schema, Model } from "mongoose";
import { IWishListInterface } from "../../../interfaces /Production/WishList/wishListInterface";

interface WishList extends IWishListInterface, Document { }



const wishListSchema: Schema = new Schema<IWishListInterface>(
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
        required: [true, "Please enter your user id"],
    },
    Stock: {
        type: Number,
        required: [true, "Please enter your product stock"],
    }
});

const WishList: Model<IWishListInterface> = mongoose.model<WishList>("WishList", wishListSchema);
export default WishList;



