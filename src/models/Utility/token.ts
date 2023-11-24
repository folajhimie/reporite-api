// import { Document, Schema, model, Types} from "mongoose";
import mongoose, { Document, Schema, Model, Types } from "mongoose";
// import { Token } from "nodemailer/lib/xoauth2";
import { TokenInterface } from "../../interfaces/Utility/TokenInterface";
// import { TokenInterface } from "../../interfaces /Utility/tokenInterface";


// Define the interface with a generic
// interface Token<T> {
//   id: string;
//   value: T;
// }

// // Import the interface to a model schema
// import { Schema, model } from "mongoose";

// const tokenSchema = new Schema<Token<string>>({
//   id: { type: String, required: true },
//   value: { type: String, required: true },
// });

// const TokenModel = model<Token<string>>("Token", tokenSchema);

// interface Token<T> extends Document {
//   user: T;
//   token: string;
//   createdAt: Date;
//   expiresAt: Date;
//   getToken: () => string;
// }

// Define the interface with a generic
// interface TokenInterface<T> {
//     id: T;
//     token: string;
//     createdAt: Date;
// }

// // Import the interface into a model schema
// import { Schema, model } from 'mongoose';
// import { TokenInterface } from './token.interface';

// // Define the schema using the interface and Types.ObjectId
// const TokenSchema = new Schema<TokenInterface<Types.ObjectId>>({
// id: { type: Types.ObjectId, required: true },
// token: { type: String, required: true },
// createdAt: { type: Date, required: true, default: Date.now }
// });

// // Create the model using the schema
// const TokenModel = model<TokenInterface<Types.ObjectId>>('Token', TokenSchema);


// export interface ITokenModel extends TokenInterface<Schema.Types.ObjectId>, Document {}

interface Token<T> extends TokenInterface<T>, Document {
  id: T & Types.ObjectId;
}

const tokenSchema = new Schema<TokenInterface<mongoose.Schema.Types.ObjectId>>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
  },
  uniqueToken: {
    type: String,
    default: "",
  },
  loginToken: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

// export default model<ITokenModel<Types.ObjectId>>('Token', TokenSchema);

const Token: Model<TokenInterface<mongoose.Schema.Types.ObjectId>> = mongoose.model<TokenInterface<mongoose.Schema.Types.ObjectId>>("Token", tokenSchema);
export { Token };
// export User;

// export const getUserByEmail = (email: string) => User.findOne({ email }).populate('role').exec();

// export { User }

// export default model<TokenInterface<Types.ObjectId>>('Token', TokenSchema);
// import { Document, Types } from 'mongoose';

// interface TokenInterface<T> {
//   id: T;
//   token: string;
//   createdAt: Date;
// }

// interface ITokenModel<T> extends TokenInterface<T>, Document {
//   id: T & Types.ObjectId;
// }

// const TokenSchema = new Schema<TokenInterface<Types.ObjectId>>({
//   id: { type: Types.ObjectId, required: true },
//   token: { type: String, required: true },
//   createdAt: { type: Date, required: true, default: Date.now }
// });

// const TokenModel = model<ITokenModel<Types.ObjectId>>('Token', TokenSchema);
