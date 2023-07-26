import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

/**
 * Interface to model the User Schema for TypeScript.
 * @param username:string
 * @param password:string
 * @param email:string
 * @param avatar:string
 * @param phone:string
 * @param role:string
 */
export interface User extends Document {
    username: string;
    password: string;
    email: string;
    phone: String;
    // tokens: { token: string }[];
    role: String;
    businessName: String;
    avatar: string;
    isAdmin: Boolean;
    active: Boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    getJwtToken: () => string;
    // savePassword: (password: string) => Promise<void>;
    comparePassword: (enteredPassword: string) => Promise<void>;
}

// interface UserModel extends Model<User> {
//     findByCredentials: (email: string, password: string) => Promise<User | null>;
// }

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
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    active: {
        type: Boolean,
        default: true
    },
    // tokens: [
    //     {
    //         token: {
    //             type: String,
    //             required: true,
    //         },
    //     },
    // ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
},
    {
        timestamps: true,
    }
);


// Hash Password
userSchema.pre<User>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error('Invalid login credentials');
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         throw new Error('Invalid login credentials');
//     }
//     return user;
// };


// jwt token
userSchema.methods.getJwtToken = function () {
    const token = jwt.sign({ _id: this._id.toHexString()}, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_SECRET,
    });
    return token;
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default model<User>("User", userSchema);





