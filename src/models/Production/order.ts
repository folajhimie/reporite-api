import { Document, model, Schema, Types } from "mongoose";

/**
 * Interface to model the Order Schema for TypeScript.
 * @param shippingInfo:string
 * @param orderItems:string
 * @param user:number
 * @param paymentInfo:string
 * @param itemsPrice:string
 * @param taxPrice:string
 * @param shippingPrice:string
 * @param totalPrice:string
 * @param orderStatus:string
 * @param stock:string
 * @param numOfReviews:string
 */


export interface Order extends Document {
    shippingInfo: string | number [];
    orderItems: string | number [];
    user: Types.ObjectId;
    paymentInfo: string[];
    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,
    orderStatus: String,
}

const orderSchema: Schema = new Schema({
    shippingInfo: {
        address: {
            type: String,
            // required: true,
        },
        city: {
            type: String,
            // required: true,
        },
        state: {
            type: String,
            // required: true,
        },
        country: {
            type: String,
            // required: true,
        },
        pinCode: {
            type: Number,
            // required: true,
        },
        phoneNo: {
            type: Number,
            // required: true,
        },
    },
    orderItems: [
        {
            productName: {
                type: String,
                required: true,
            },
            productPrice: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            productImage: {
                type: String,
                required: true,
            },
            productId: {
                type: Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model<Order>('Order', orderSchema);



