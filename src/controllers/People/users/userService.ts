import { UserInterface } from "../../../interfaces/People/userInterface";
import IUserRepository from "../../../repositories/People/users/userRepositories";
import { User } from "../../../models/People/user";
import { AppError, HttpCode } from "../../../exceptions/appError";
import cloudinary from 'cloudinary';

export class UserRepository implements IUserRepository {
    async getUser(userId: string): Promise<UserInterface> {

        let user = await User.findById(userId).populate('role').exec();
        if (!user) {
            throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User not Found' });
        }

        return user
    }

    async getAllUsers(requestQuery: any): Promise<any> {
        let pageOptions: { page: number; limit: number } = {
            page: Number(requestQuery.query.page) || 1,
            limit: Number(requestQuery.query.limit) || 10
        }

        const count = await User.countDocuments({});

        //GETTING DATA FORM TABLE
        let users = await User.find()
            .populate('role')
            .limit(pageOptions.limit * 1)
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .sort({ createdAt: 1 });

        //CREATE PAGINATION 
        const meta = {
            total: count,
            limit: pageOptions.limit,
            totalPages: Math.ceil(count / pageOptions.limit),
            currentPage: pageOptions.page
        }

        const responseType = {
            users,
            meta
        }
        return responseType;
    }

    async updateUser(payload: any, user: Partial<UserInterface>): Promise<any> {
        const userId = payload.params.id;

        let foundUser: UserInterface | any = await User.findById(userId).exec();

        //IF USER IS NOT FOUND 
        if (!foundUser) {
            throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'User not found!' });
        }

        const imageId = foundUser?.avatar?.public_id

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(foundUser.avatar, {
            folder: "users",
            width: 150,
            crop: "scale",
        });

        const foundImage = foundUser.avatar = {
            public_id: myCloud.public_id,
            secure_url: myCloud.secure_url,
        };

        const newUserData = {
            username: user?.username,
            email: user?.email,
            phone: user?.phone,
            role: user?.role,
            avatar: foundImage,
            isAdmin: user?.isAdmin,
            isLocked: user?.isLocked,
            code: user?.code,
            active: user?.active
        };


        let savedUser = await User.findByIdAndUpdate(
            { _id: payload.user.id },
            {
                newUserData
            },
            { 
                new: true,
                runValidator: true,
                useFindAndModify: false,
            } // Return the updated document
        )

        return savedUser;
    }

    async deleteUser(userId: string): Promise<void> {

        const user: UserInterface | any = await User.findById(userId).exec();
        
        const imageId = user?.avatar?.public_id

        await cloudinary.v2.uploader.destroy(imageId);

        //CHECK IF USER IS FOUND 
        if (!user) {
            throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'User not found!'});
        }

        await User.findByIdAndDelete(userId)
    }
}