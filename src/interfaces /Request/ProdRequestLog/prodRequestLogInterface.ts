import mongoose, { Document, Schema, Types } from 'mongoose';
import { IProductRequestInterface } from '../ProdRequest/prodRequestInterface';

interface IProductRequestLogInterface {
    productRequestId: Types.ObjectId | IProductRequestInterface;
    quantity: number;
    vendorPrice: number;
}

export { IProductRequestLogInterface }