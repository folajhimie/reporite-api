import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { UserInterface } from "../../interfaces/People/userInterface";
import { Product } from "../Production/Product/product";
import { RoleType } from "../../utils/Enums";

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
        code: {
            type: String,           
        },
        role: {
            type: String,
            enum: Object.values(RoleType),
            default: RoleType.VENDOR,
        },
        avatar: {
            type: String,
            required: [true, "Please add a photo"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        userAgent: {
            type: [String],
            required: true,
            default: [],
        },
        ipAddress: {
            type: String,
            required: true,
        },
        shopId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Shop', 
            required: true 
        },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
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
// export const User = model<User>("User", userSchema);

const User: Model<UserInterface> = mongoose.model<UserInterface>("User", userSchema);
// export User;
// export User;

export const getUserByEmail = (email: string) => User.findOne({ email }).populate('role').exec();

export { User }
