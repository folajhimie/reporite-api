import mongoose, { Document, Schema, Types } from 'mongoose';
import { IProductRequestInterface } from '../ProdRequest/prodRequestInterface';
import { IShopInterface } from '../../Production/Shop/shopInterface';
import { IUserInterface } from '../../People/userInterface';

interface IProductRequestLogInterface {
    productRequestId: Types.ObjectId | IProductRequestInterface;
    quantity: number;
    vendorPrice: number;
    userId: Types.ObjectId | IUserInterface;
    shopId: Types.ObjectId | IShopInterface;
}

export { IProductRequestLogInterface }