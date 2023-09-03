import mongoose, { Document, Schema, Model, Types } from 'mongoose';
import { IPromotionInterface } from '../../../interfaces /Production/Promotion/promotionInterface';

interface Promotion extends IPromotionInterface, Document {}

const promotionSchema = new Schema<IPromotionInterface>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference the Product model
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    // ... define other promotion fields here
});

const Promotion: Model<IPromotionInterface> = mongoose.model<Promotion>("Promotion", promotionSchema);
export default Promotion;