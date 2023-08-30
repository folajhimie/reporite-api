import mongoose, { Document, Schema, Model } from "mongoose";
import { IShopInterface } from "../../../interfaces /Production/Shop/shopInterface";

interface Shop extends IShopInterface, Document { }


const shopSchema: Schema = new Schema<IShopInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter your Shop name!"],
        },
        description: {
            type: String,
            required: [true, "Please enter your Shop description!"],
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter your Shop price!"],
        },
        address: {
            type: String,
            required: [true, "Please enter your Shop category!"],
        },
        avatar: {
            type: String,
            required: true,
        },
        productId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        },
    },
    { timestamps: true }
);


const Shop: Model<IShopInterface> = mongoose.model<Shop>("Shop", shopSchema);
export default Shop;