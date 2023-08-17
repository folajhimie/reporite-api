import { Document, model, Schema } from "mongoose";
import { IRole } from "../../interfaces /People/roleInterface";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 * @param code:string
 */


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface IRoleModel extends IRole, Document {}

const roleSchema: Schema = new Schema<IRole>({
    name: {
        type: String,
        required: [true, 'Role is required'],
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
},
    { timestamps: true }
);


export default model<IRoleModel>("Role", roleSchema);


