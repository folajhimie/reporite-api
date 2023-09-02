import mongoose, { Document, Schema, Types } from 'mongoose';

interface IOrderItem {
  _id: Types.ObjectId;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  productId: string;
  shopId: string;
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
  cart: IOrderItem[];
  shippingAddress: IShippingAddress;
  createdBy: Types.ObjectId; // Define your user type here, replace 'any' with the actual type
  totalPrice: number;
  status: string;
  paymentInfo: IPaymentInfo;
  paidAt: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

export { IOrderInterface, IPaymentInfo, IShippingAddress, IOrderItem }

