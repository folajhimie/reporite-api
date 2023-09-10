import mongoose, { Document, Schema, Model } from "mongoose";
import { ICartInterface, ICartItemInterface } from "../../../interfaces/Production/Cart/cartInterface";

interface Cart extends ICartInterface, Document {}

interface CartItem extends ICartItemInterface, Document {}

const cartItemSchema: Schema = new Schema<ICartItemInterface>(
    {
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const cartSchema: Schema = new Schema<ICartInterface>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }], // Reference the CartItem model
    // ... define other cart fields here
    },
    { timestamps: true }
);

const Cart: Model<ICartInterface> = mongoose.model<ICartInterface>("Cart", cartSchema);

const CartItem: Model<ICartItemInterface> = mongoose.model<ICartItemInterface>('CartItem', cartItemSchema);

// export default Cart;
export { Cart, CartItem };















