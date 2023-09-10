import mongoose, { Document, Schema, Model, Types} from "mongoose";
// import { IRole } from "../../People/roleInterface";
import { RoleType } from "../../../utils/Enums";
import { UserInterface } from "../../People/userInterface";
import { IProductInterface } from "../Product/productInterface";


// Define the ITransaction interface
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

// Define the IShopInterface interface with relationships
interface IShopInterface extends Document {
  name: string;
  email: string;
  description?: string;
  address: string;
  phoneNumber: number;
  role: RoleType;
  avatar: string;
  active: boolean;
  withdrawMethod?: IWithdrawMethod;
  availableBalance: number;
  user: Types.ObjectId | UserInterface; // User relationship
  products: Types.ObjectId[] | IProductInterface; // Product relationship (one-to-many)
  transactions: ITransaction[]; // Transaction relationship (one-to-many)
  createdAt: Date;
}


export { IShopInterface, IWithdrawMethod, ITransaction }



