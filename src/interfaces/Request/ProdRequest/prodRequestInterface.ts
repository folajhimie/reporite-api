import mongoose, { Document, Schema, Types } from 'mongoose';
import { IProductInterface } from '../../Production/Product/productInterface';
import { IProductRequestLogInterface } from '../ProdRequestLog/prodRequestLogInterface';

interface IProductRequestInterface {
    // [x: string]: any;
    productId: Types.ObjectId | IProductInterface;
    duration: number;
    startedDate: Date;
    expirationDate: Date;
    quantity: number;
    vendorPrice: number;
    productRequestLog: IProductRequestLogInterface[];
}

export { IProductRequestInterface }