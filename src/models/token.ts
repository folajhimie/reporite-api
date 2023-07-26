import { Document, Schema, model, Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from './user';
import dotenv from "dotenv";
dotenv.config();

interface Token<T> extends Document {
    user: T;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    getToken: () => string;
}

const tokenSchema = new Schema<Token<User>>({
    user: {
        type: Types.ObjectId,
        ref: 'IUser',
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
    expiresAt: {
        type: Date,
        required: true,
    },
});

tokenSchema.methods.getToken = function <T extends User>(user: T, secret:string) {
    const token = jwt.sign({ _id: user._id.toHexString()}, secret, {
        expiresIn: process.env.ACCESS_TOKEN_SECRET,
    });
    this.token = token;
    this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return token;
};

export default model<Token<User>>('Token', tokenSchema);
