import mongoose, { Document, Schema, Model } from "mongoose";
import { ICategoryInterface } from "../../../interfaces /Inventory/Category/categoryInterface";

interface Category extends ICategoryInterface, Document { }

const categorySchema = new Schema<ICategoryInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter the category name"],
            unique: true
        },
    },
    { timestamps: true }
);

const Category: Model<ICategoryInterface> = mongoose.model<Category>("Category", categorySchema);
export default Category;