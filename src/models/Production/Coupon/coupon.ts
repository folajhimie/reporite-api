import mongoose, { Document, Schema, Model } from "mongoose";
import { ICouponInterface } from "../../../interfaces /Production/Coupon/couponInterface";

interface Coupon extends ICouponInterface, Document { }

const couponSchema: Schema = new Schema<ICouponInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter your coupoun code name!"],
            unique: true,
        },
        value: {
            type: Number,
            required: true,
        },
        minAmount: {
            type: Number,
        },
        maxAmount: {
            type: Number,
        },
        shopId: {
            type: String,
            required: true,
        },
        selectedProduct: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const Coupon: Model<ICouponInterface> = mongoose.model<Coupon>("Coupon", couponSchema);
export default Coupon;