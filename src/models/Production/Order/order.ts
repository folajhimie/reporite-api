import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IOrderInterface } from "../../../interfaces /Production/Order/orderInterface";

interface Order extends IOrderInterface, Document { }


const orderSchema: Schema = new Schema<IOrderInterface>(
    {
        cart: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: () => new Types.ObjectId(),
                },
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
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                shopId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Shop",
                }
            },
        ],
        shippingAddress: {
            type: Object,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: 'Processing',
        },
        paymentInfo: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            type: {
                type: String,
            },
        },
        paidAt: {
            type: Date,
            default: Date.now(),
        },
        deliveredAt: {
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

// export default mongoose.model<IOrder>('Order', orderSchema);

const Order: Model<IOrderInterface> = mongoose.model<Order>("Order", orderSchema);
export default Order;