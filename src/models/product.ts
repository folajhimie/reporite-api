import { Document, model, Schema, Types } from "mongoose";

/**
 * Interface to model the Product Schema for TypeScript.
 * @param name:string
 * @param description:string
 * @param price:number
 * @param offerPrice:string
 * @param color:string
 * @param size:string
 * @param ratings:string
 * @param images:string
 * @param category:string
 * @param stock:string
 * @param numOfReviews:string
 */


export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    offerPrice: string;
    color: string;
    size: string;
    ratings: number;
    images: string[];
    category: number;
    stock: number;
    numOfReviews: number;

}

const productSchema: Schema = new Schema({
    _id: {
        type: Types.ObjectId,
        default: Types.ObjectId,
    },
    name: {
        type: String,
        required: [true, "Please enter a name of a product"],
        trim: true,
        maxLength: [20, "Product name not exceed than 20 characters"]
    },
    description: {
        type: String,
        required: [true, "Please add a description of your product"],
        maxlength: [4000, "Description is can not exceed than 4000 characters"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price for your product"],
        maxLength: [8, "Price can not exceed than 8 characters"],
    },
    offerPrice: {
        type: String,
        maxLength: [4, "Discount price can not exceed than 4 characters"],
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 0,
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
        }
    ],
    category: {
        type: String,
        required: [true, "Please add a category of your product"],
    },
    stock: {
        type: Number,
        required: [true, "Please add some stoke for your product"],
        maxLength: [3, "Stock can not exceed than 3 characters"],
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
            },
            time: {
                type: Date,
                default: Date.now()
            },
        },
    ],
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

export default model<IProduct>('Product', productSchema);



