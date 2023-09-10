import mongoose, { Document, Schema, Model } from "mongoose";
import { IProductInterface, IReviewInterface } from "../../../interfaces/Production/Product/productInterface";
// import { ProductRequest } from "../../Request/ProdRequest.ts/prodRequest";

interface Product extends IProductInterface, Document {}

interface Review extends IReviewInterface, Document {}


const reviewSchema: Schema = new Schema<IReviewInterface>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

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
        reviews: [reviewSchema],
        ratings: {
            type: Number,
        },
        shopId: {
            type: Schema.Types.ObjectId,
            ref: 'Shop',
            required: true
        },
        // shop: {
        //     type: Object,
        //     required: true,
        // },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        productRequest: {
            type: Schema.Types.ObjectId,
            ref: 'ProductRequest',
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


const Product: Model<IProductInterface> = mongoose.model<IProductInterface>("Product", productSchema);

const Review: Model<IReviewInterface> = mongoose.model<IReviewInterface>("Review", reviewSchema);

export { Product, Review }