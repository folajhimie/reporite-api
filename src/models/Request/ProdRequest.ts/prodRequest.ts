import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IProductRequestInterface } from "../../../interfaces /Request/ProdRequest/prodRequestInterface";
// import { Product } from "../../Production/Product/product";
import { ProductRequestLog } from "../ProdRequestLog.ts/prodRequestLog";

interface ProductRequest extends IProductRequestInterface, Document {}

const productRequestSchema: Schema = new Schema<IProductRequestInterface>(
    {      
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        duration: {
            type: Number,
            required: true,
        }, 
        startedDate: {
            type: Date,
            required: true,
        },
        expirationDate: {
            type: Date,
        },
        quantity: {
            type: Number,
            required: true,
        },
        vendorPrice: {
            type: Number,
            required: true,
        },
        productRequestLog: [ProductRequestLog],
    }
)

const ProductRequest: Model<IProductRequestInterface> = mongoose.model<IProductRequestInterface>("ProductRequest", productRequestSchema);

export { ProductRequest }