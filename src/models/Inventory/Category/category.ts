import mongoose, { Document, Schema, Model } from "mongoose";
import { ICategoryInterface } from "../../../interfaces/Inventory/Category/categoryInterface";

interface Category extends ICategoryInterface, Document { }

// Define the category schema
const categorySchema = new Schema<ICategoryInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter the category name"],
            unique: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference the Product model
            },
        ],
    },
    { timestamps: true }
);

const Category: Model<ICategoryInterface> = mongoose.model<ICategoryInterface>("Category", categorySchema);
export default Category;