import { Document, model, Schema } from "mongoose";
import { IRole } from "../../interfaces/People/roleInterface";

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 */


//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
export interface Role extends IRole, Document {}

const roleSchema: Schema = new Schema<IRole>({
    name: {
        type: String,
        required: [true, 'Role is required'],
        maxlength: 50,
        minlength: 3,
        trim: true
    },
},
    { timestamps: true }
);

const Role = model<Role>("Role", roleSchema);
export default Role;


