import mongoose, { Document, Schema, Model } from "mongoose";
import { IProductInterface } from "../../../interfaces /Production/Product/productInterface";

interface Product extends IProductInterface, Document { }


const productSchema: Schema = new Schema<IProductInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter your product name!"],
        },
        description: {
            type: String,
            required: [true, "Please enter your product description!"],
        },
        category: {
            type: String,
            required: [true, "Please enter your product category!"],
        },
        tags: {
            type: String,
        },
        originalPrice: {
            type: Number,
        },
        discountPrice: {
            type: Number,
            required: [true, "Please enter your product price!"],
        },
        vendorPrice: {
            type: Number,
        },
        stock: {
            type: Number,
            required: [true, "Please enter your product stock!"],
        },
        images: [
            {
                type: String,
            },
        ],
        reviews: [
            {
                user: {
                    type: Object,
                },
                rating: {
                    type: Number,
                },
                comment: {
                    type: String,
                },
                productId: {
                    type: String,
                },
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
        ratings: {
            type: Number,
        },
        shopId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Shop', 
            required: true 
        },
        shop: {
            type: Object,
            required: true,
        },
        sold_out: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);


const Product: Model<IProductInterface> = mongoose.model<Product>("Product", productSchema);
export default Product;