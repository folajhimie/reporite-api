import { Document, model, Schema, Types } from "mongoose";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
import { UserInterface } from "../../interfaces/People/userInterface";
// dotenv.config();

/**
 * Interface to model the User Schema for TypeScript.
 * @param username:string
 * @param password:string
 * @param email:string
 * @param avatar:string
 * @param phone:string
 * @param role:string
 */

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
interface User extends UserInterface, Document { }

// export interface IUserDocument extends Model<User> {
//     comparePassword(password: string, hash: string): Promise<boolean>;
// }

// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema<UserInterface>(
    {
        
        username: {
            type: String,
            required: [true, "Please provide name"],
            maxlength: 20,
            minlength: [3, "Minimum firstname length is 6 characters"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            validate(value: string) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error("Password should not contain word: password");
                }
            },
            minlength: [6, "Minimum password length is 4 characters"],
            select: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            minLength: 8,
            validate: {
                validator: (v: any) => /\d{2,3}-\d{6,}/.test(v) || /\d{8,}/.test(v),
                message: "this is not a valid number",
            },
        },
        confirmPassword: {
            type: String,
            minlength: [6, "Minimum password length is 4 characters"],
            select: false,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        },
        avatar: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        request_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Request', 
            required: true 
        },
        organization_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Organization', 
            required: true 
        },
    },
    {
        timestamps: true,
    }
);

// Hash Password
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         this.password = hashedPassword;
//         next();
//     } catch (error) {
//         console.log('error', error);
//         next()
//     }
// });

// // jwt token
// userSchema.methods.getJwtToken = function (): string {
//     const secret = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";
//     const token = jwt.sign({ _id: this._id }, secret, {
//         expiresIn: '30m',
//     });
//     return token;
// };

// // compare password
// userSchema.methods.comparePassword = async function (
//     password: string,
//     hash: string
// ): Promise<boolean> {
//     return await bcrypt.compare(password, hash);
// };

// export default model<User>("User", userSchema);
export const User = model<User>("User", userSchema);
// export User;

export const getUserByEmail = (email: string) => User.findOne({ email }).populate('role').exec();
