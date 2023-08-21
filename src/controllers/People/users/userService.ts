import { UserInterface } from "../../../interfaces /People/userInterface";
import IUserRepository from "../../../repositories/People/userRepositories";
import { User } from "../../../models/People/user";
import { AppError, HttpCode } from "../../../exceptions/appError";

export class UserRepository implements IUserRepository {
    async getUser(userId: string): Promise<UserInterface> {
        
        let user = await User.findById(userId).populate('role').exec();
        if (!user) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'User not Found' 
            });
        }

        return user
    }

    async getAllUsers(requestQuery: any):  Promise<any>{
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

    async updateUser(payload: any, user: Partial<UserInterface>): Promise<any>{
        const userId = payload['id'];

        // CHECK IF USER IS TRYING TO UPDATE ANOTHER USER DATA
        if (userId !== payload.params.userId) {
            throw new AppError({ 
                httpCode: HttpCode.FORBIDDEN, 
                description: 'Access Forbidden' 
            });
        }

        let foundUser = await User.findById(userId);

        //IF USER IS NOT FOUND 
        if (!foundUser) {
            throw new AppError({ 
                httpCode: HttpCode.UNAUTHORIZED, 
                description: 'User not found!' 
            });
        }

        let savedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                username: user?.username,
                email: user?.email,
                phone: user?.phone,
                role: user?.role,
                avatar: user?.avatar
            }
        )

        return savedUser;
    }

    async deleteUser(userId: string): Promise<void>{

        const user = await User.findById(userId);

        //CHECK IF USER IS FOUND 
        if (!user) {
            throw new AppError({ 
                httpCode: HttpCode.NOT_FOUND, 
                description: 'User not found!' 
            });
        }

        await User.findByIdAndDelete(userId)
    }
}