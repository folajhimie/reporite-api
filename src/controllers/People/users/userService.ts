import { IUserInterface } from "../../../interfaces/People/userInterface";
import IUserRepository from "../../../repositories/People/users/userRepositories";
import { User } from "../../../models/People/user";
import { AppError, HttpCode } from "../../../exceptions/appError";
// import cloudinary from 'cloudinary';
import { CloudinaryService } from "../../../utils/Cloudinary";

export class UserRepository implements IUserRepository {
    async getUser(req: any): Promise<IUserInterface | any> {

        try {
            console.log("all the user", req, req.user);
            // let user = await User.findById(userId).populate('role').exec();
            let user = await User.findById(req.user.id).select('-password');
            if (!user) {
                throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'User not Found' });
            }
    
            return user
            
        } catch (error) {
           console.log("error in getting user: ", error); 
        }
        
    }

    async getAllUsers(requestQuery: any): Promise<any> {
        let pageOptions: { page: number; limit: number } = {
            page: Number(requestQuery.query.page) || 1,
            limit: Number(requestQuery.query.limit) || 10
        }

        const count = await User.countDocuments({});

        //GETTING DATA FORM TABLE
        let users = await User.find()
            // .populate('role')
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

    async updateUser(payload: any, user: Partial<IUserInterface>): Promise<any> {
        const userId = payload.params.id;

        let foundUser: IUserInterface | any = await User.findById(userId).exec();

        //IF USER IS NOT FOUND 
        if (!foundUser) {
            throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'User not found!' });
        }

        const imageId = foundUser?.avatar?.public_id

        // await cloudinary.v2.uploader.destroy(imageId);
        await CloudinaryService.destroyImage(imageId);

        const myCloud = await CloudinaryService.uploadImage(foundUser.avatar, "users");

        const foundImage = foundUser.avatar = {
            public_id: myCloud.public_id,
            secure_url: myCloud.secure_url,
        };

        const newUserData = {
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            phone: user?.phone,
            role: user?.roles,
            avatar: foundImage,
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

        const user: IUserInterface | any = await User.findById(userId).exec();
        
        const imageId = user?.avatar?.public_id

        await CloudinaryService.destroyImage(imageId);

        //CHECK IF USER IS FOUND 
        if (!user) {
            throw new AppError({ httpCode: HttpCode.NOT_FOUND, description: 'User not found!'});
        }

        await User.findByIdAndDelete(userId)
    }
}