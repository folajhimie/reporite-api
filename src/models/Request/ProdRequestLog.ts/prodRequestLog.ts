import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IProductRequestLogInterface } from "../../../interfaces /Request/ProdRequestLog/prodRequestLogInterface";
// import { Product } from "../../Production/Product/product";

interface ProductRequestLog extends IProductRequestLogInterface, Document {}

const productRequestLogSchema: Schema = new Schema<IProductRequestLogInterface>(
    {      
        productRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductRquest' },
        quantity: {
            type: Number,
            required: true,
        },
        vendorPrice: {
            type: Number,
            required: true,
        },
    }
)

const ProductRequestLog: Model<IProductRequestLogInterface> = mongoose.model<IProductRequestLogInterface>("ProductRequestLog", productRequestLogSchema);

export { ProductRequestLog }