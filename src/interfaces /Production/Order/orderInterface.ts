import mongoose, { Document, Schema, Model } from "mongoose";

interface OrderItem extends Document {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: mongoose.Schema.Types.ObjectId;
}

interface ShippingAddress extends Document {
  address: string;
  city: string;
  postalcode: string;
  country: string;
}

interface PaymentResult extends Document {
  id: string;
  status: string;
  upload_status: string;
  email_address: string;
}

export interface IOrderInterface extends Document {
  user: mongoose.Schema.Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod?: string; // Payment method might be optional
  paymentResult?: PaymentResult; // Payment result might be optional
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDeliverd: boolean;
  deliverAt?: Date;
  createdAt: Date;
}


