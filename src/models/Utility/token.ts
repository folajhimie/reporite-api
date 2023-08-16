import { Document, Schema, model, Types} from "mongoose";
import { TokenInterface } from "../../interfaces /Utility/tokenInterface";

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

interface ITokenModel<T> extends TokenInterface<T>, Document {
    id: T & Types.ObjectId;
}

const TokenSchema = new Schema<TokenInterface<Types.ObjectId>>({
  id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

export default model<ITokenModel<Types.ObjectId>>('Token', TokenSchema);

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
