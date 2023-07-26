import { Document, model, Schema } from "mongoose";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 * @param code:string
 */
export interface IRole extends Document {
    name: string;
    code: string;
}

const roleSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true
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

export default model<IRole>('Role', roleSchema);


