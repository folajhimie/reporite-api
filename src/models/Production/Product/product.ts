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
        min_stock: {
            type: Number,
            default: 0
        },
        max_stock: {
            type: Number,
            default: 50
        },
        stock: {
            type: Number,
            required: [true, "Please enter your product stock!"],
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                user: { 
                    type: Schema.Types.ObjectId, 
                    ref: "User", 
                    required: true 
                },
                name: { 
                    type: String, 
                    required: true 
                },
                rating: { 
                    type: Number, 
                    required: true 
                },
                comment: { 
                    type: String, 
                    required: true 
                },
                productId: { 
                    type: String, 
                    required: true 
                },
                createdAt: { 
                    type: Date, 
                    default: Date.now 
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
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
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