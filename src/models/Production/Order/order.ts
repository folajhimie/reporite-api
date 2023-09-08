import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IOrderInterface, IOrderItemInterface } from "../../../interfaces /Production/Order/orderInterface";

interface Order extends IOrderInterface, Document {}

interface OrderItem extends IOrderItemInterface, Document {}


const orderItemSchema: Schema = new Schema<IOrderItemInterface>(
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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Order",
        },

    },
    { timestamps: true }
);

const orderSchema: Schema = new Schema<IOrderInterface>(
    {
        orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
        shippingAddress: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            }
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

const Order: Model<IOrderInterface> = mongoose.model<IOrderInterface>("Order", orderSchema);

const OrderItem: Model<IOrderItemInterface> = mongoose.model<IOrderItemInterface>("OrderItem", orderItemSchema);

export { Order, OrderItem}