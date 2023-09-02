import mongoose, { Document, Schema, Model, Types} from "mongoose";
import { IRole } from "../../People/roleInterface";

interface ITransaction extends Document {
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface IWithdrawMethod {
  id?: string;
  withdrawType?: string;
}

// interface I

interface IShopInterface extends Document {
  name: string;
  email: string;
  description?: string;
  address: string;
  phoneNumber: number;
  role: IRole;
  avatar: string;
  withdrawMethod?: IWithdrawMethod;
  availableBalance: number;
  transactions: ITransaction[];
  createdAt: Date;
}

export { IShopInterface, IWithdrawMethod, ITransaction }

