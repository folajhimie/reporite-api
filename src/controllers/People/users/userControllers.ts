import IUserRepository from "../../../repositories/People/users/userRepositories";
import { AppError, HttpCode } from "../../../exceptions/appError";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./userService";
import { UserInterface } from "../../../interfaces /People/userInterface";
import { jsonOne, jsonAll } from "../../../utils/Reponse";


export class UserController {

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {

            const userRepository: IUserRepository = new UserRepository();
            let resultAuth = await userRepository.getUser(
                req.params.id
            )
            return jsonOne<UserInterface>(res, 200, resultAuth); 
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {

        try {
            const userRepository: IUserRepository = new UserRepository();
            let resultAuth = await userRepository.getAllUsers(
                req
            )

            const {users ,meta} = resultAuth 
            return jsonAll<any>(res, 200, users, meta);
            
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        const payload = req

        try {
            const userRepository: IUserRepository = new UserRepository();
            let resultAuth = await userRepository.updateUser(
                payload,
                req.body
            )
            return jsonOne<UserInterface>(res, 200, resultAuth);
            
        } catch (error) {
            next(error)
        }
    }

        async deleteUser(req: Request, res: Response, next: NextFunction) {
            const userId = req.params.id 
            try {
                const userRepository: IUserRepository = new UserRepository();
                let resultAuth = await userRepository.deleteUser(
                    userId
                )
                return jsonOne<string>(res, 200, 'User Sucessfully Deleted');
                
            } catch (error) {
                next(error)
            }
        } 
}