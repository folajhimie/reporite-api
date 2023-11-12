import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IUserInterface } from "../../interfaces/People/userInterface";
// import { IRoleInterface } from "../../interfaces/People/roleInterface";
// import { Product } from "../Production/Product/product";
// import { RoleType } from "../../utils/Enums";

//EXPORT INTERFACE WITH MONGOOSE DOCUMENT
interface User extends IUserInterface, Document { }


// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema<IUserInterface>(
    {
        firstName: {
            type: String,
            required: [true, "Please provide name"],
            maxlength: 20,
            minlength: [3, "Minimum firstname length is 6 characters"],
            trim: true,
        },
        lastName: {
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
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
            default: {
                public_id: 'default_public_id',
                secure_url: "https://i.ibb.co/4pDNDk1/avatar.png",
            },
        },
        roles: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Roles',
            default: "Owner",
        },
        
        // avatars: {
        //     type: String,
        //     required: [true, "Please add a photo"],
        //     default: "https://i.ibb.co/4pDNDk1/avatar.png",
        // },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        securityCode: {
            type: String,
        },
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        },
        isCompleted: {
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
        business: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

// Static method in the model
userSchema.statics.scopeByUser = function ({ business, user , query }) {
    const roleCodes = user.toJSON().roles.map((role: any) => role.code);

    if (roleCodes.includes("SYS")) return query;

    query = query.find("business", business.id);

    if (roleCodes.filter((code: any) => ["OWR"].includes(code)).length > 0)
        return query;

    return query.where("id", 0);
}

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

const User: Model<IUserInterface> = mongoose.model<IUserInterface>("User", userSchema);

// const UserModel: Model<UserInterface> = mongoose.model<UserInterface>('User', UserSchema);





export const getUserByEmail = (email: string) => User.findOne({ email }).populate('role').exec();

export { User }
