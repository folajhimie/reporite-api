import mongoose, { Document, Schema, Model } from "mongoose";
import { IWishListInterface } from "../../../interfaces/Production/WishList/wishListInterface";

interface WishList extends IWishListInterface, Document { }



const wishListSchema: Schema = new Schema<IWishListInterface>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Replace with your User model
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product', // Replace with your Product model
        },
    ],
});

const WishList: Model<IWishListInterface> = mongoose.model<WishList>("WishList", wishListSchema);
export default WishList;







