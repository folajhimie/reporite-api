import { Document, model, Schema } from "mongoose";
import { IRoleInterface } from "../../interfaces/People/roleInterface";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 */


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface Role extends IRoleInterface, Document {}

const roleSchema: Schema = new Schema<IRoleInterface>({
    name: {
        type: String,
        required: [true, 'Role is required'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
    code: {
        type: String, 
    },
},
    { timestamps: true }
);

const Role = model<IRoleInterface>("Role", roleSchema);
export default Role;


