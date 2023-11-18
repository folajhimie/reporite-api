import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUserInterface } from '../../People/userInterface';
import { IProductInterface } from '../Product/productInterface';
import { IShopInterface } from '../Shop/shopInterface';

interface IOrderItemInterface {
  // _id: Types.ObjectId;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  orderId: Types.ObjectId;
  productId: Types.ObjectId | IProductInterface;
  shopId: Types.ObjectId | IShopInterface;
}

interface IShippingAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  phoneNumber?: number;
}

interface IPaymentInfo {
  id?: string;
  status?: string;
  type?: string;
}

interface IOrderInterface extends Document {
  orderItems: Types.ObjectId[] | IOrderItemInterface[];
  shippingAddress: IShippingAddress;
  createdBy: Types.ObjectId | IUserInterface; // Define your user type here, replace 'any' with the actual type
  totalPrice: number;
  status: string;
  paymentInfo: IPaymentInfo;
  paidAt: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

export { IOrderInterface, IPaymentInfo, IShippingAddress, IOrderItemInterface }

