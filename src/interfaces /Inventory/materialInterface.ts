// // Define the interface with a generic
// interface RelatedEntity<T> {
//   entity: T;
// }

// // Define the user model schema
// import { Schema, model } from "mongoose";

// // Import the RelatedEntity interface
// import { RelatedEntity } from "./related-entity.interface";

// // Define the role schema
// const roleSchema = new Schema({
//   name: { type: String, required: true },
// });

// // Define the vendor schema
// const vendorSchema = new Schema({
//   name: { type: String, required: true },
// });

// // Define the user schema using the RelatedEntity interface
// const userSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: Schema.Types.ObjectId, ref: "Role" } as RelatedEntity<
//     typeof roleSchema
//   >,
//   vendor: { type: Schema.Types.ObjectId, ref: "Vendor" } as RelatedEntity<
//     typeof vendorSchema
//   >,
// });

// // Create and export the user model
// export const UserModel = model("User", userSchema);





// import mongoose, { Document, Model, Schema } from 'mongoose';

// // Define interfaces for User, Role, and Vendor
// interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   roles: IRole['_id'][];
//   vendors: IVendor['_id'][];
// }

// interface IRole extends Document {
//   name: string;
// }

// interface IVendor extends Document {
//   name: string;
// }

// // Define schemas for User, Role, and Vendor
// const roleSchema = new Schema<IRole>({
//   name: { type: String, required: true },
// });

// const vendorSchema = new Schema<IVendor>({
//   name: { type: String, required: true },
// });

// const userSchema = new Schema<IUser>({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
//   vendors: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }],
// });

// // Define models for User, Role, and Vendor
// const Role: Model<IRole> = mongoose.model('Role', roleSchema);
// const Vendor: Model<IVendor> = mongoose.model('Vendor', vendorSchema);
// const User: Model<IUser> = mongoose.model('User', userSchema);

// export { IUser, IRole, IVendor, Role, Vendor, User };
