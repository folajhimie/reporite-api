import mongoose, { Document, Schema, Model } from "mongoose";
import { IShopInterface } from "../../../interfaces /Production/Shop/shopInterface";

interface Shop extends IShopInterface, Document {}


const shopSchema: Schema = new Schema<IShopInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter your shop name!"],
        },
        email: {
            type: String,
            required: [true, "Please enter your shop email address"],
        },
        description: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        role: {
            name: String,
            default: "Vendor",
        },
        avatar: {
            type: String,
            required: true,
        },
        withdrawMethod: {
            id: {
              type: String,
              required: true,
            },
            withdrawType: {
              type: String,
              default: "Transfer",
            },
        },
        availableBalance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                amount: {
                    type: Number,
                    required: true,
                },
                status: {
                    type: String,
                    default: "Processing",
                },
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
                updatedAt: {
                    type: Date,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
        },

    },
    { timestamps: true }
);




const Shop: Model<IShopInterface> = mongoose.model<Shop>("Shop", shopSchema);
export default Shop;