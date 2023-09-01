import mongoose, { Document, Schema, Model } from "mongoose";
import { ICoupounCodeInterface } from "../../../interfaces /Production/CoupounCode/coupounCodeInterface";

interface CoupounCode extends ICoupounCodeInterface, Document { }

const coupounCodeSchema: Schema = new Schema<ICoupounCodeInterface>(
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

const CoupounCode: Model<ICoupounCodeInterface> = mongoose.model<CoupounCode>("CoupounCode", coupounCodeSchema);
export default CoupounCode;