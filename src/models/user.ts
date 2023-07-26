import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Interface to model the User Schema for TypeScript.
 * @param username:string
 * @param password:string
 * @param email:string
 * @param avatar:string
 * @param phone:string
 * @param role:string
 */
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    phone: String;
    role: String;
    businessName: String;
    avatar: string;
    savePassword: (password: string) => Promise<void>;
}

const userSchema: Schema = new Schema({
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
    role: {
        type: String,
        ref: "Role",
        required: true,
        default: ["vendor"],
    },
    businessName: {
        type: String,
        required: [true, "Please enter your business name"],
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.methods.savePassword = async function (password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
};

export default model<IUser>("User", userSchema);


