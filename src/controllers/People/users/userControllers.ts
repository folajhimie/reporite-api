import IUserRepository from "../../../repositories/People/users/userRepositories";
import { AppError, HttpCode } from "../../../exceptions/appError";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "./userService";
import { IUserInterface } from "../../../interfaces/People/userInterface";
import { jsonOne, jsonAll } from "../../../utils/Reponse";
import { MailController } from "../../Utility/mailControllers";
import welcomeBack from "../../../views/welcomeBack";
import { HelpFunction  } from "../../../Helpers/helpFunction"; 

export class UserController {

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {

            const userRepository: IUserRepository = new UserRepository();
            let resultAuth = await userRepository.getUser(
                req
            )

            // const ipAddress = req?.connection.remoteAddress || req.headers['x-forwarded-for'];
            // const ipAddressess = req.socket.remoteAddress || req.headers['x-forwarded-for'];
  
            // console.log(`User IP Address: ${ipAddressess}`);
            console.log("controllers in the code ..", resultAuth)
            return jsonOne<IUserInterface>(res, 200, resultAuth);
        } catch (error) {
            next(error)
        }
    }

    async securityCode(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository: IUserRepository = new UserRepository();
            let resultAuth = await userRepository.getSecurityCode(
                req, res
            )

            const getUserDate: string | any = HelpFunction.getFullDateForUser()
            
            const getUserTime: string | any = HelpFunction.getFullTimeForUser()
            
            let fullDate: string = `${getUserDate} ${getUserTime}`
            console.log("all the date ...", fullDate);
            //SEND VERIFICATION MAIL TO USER 

            // const mailController = new MailController();
            // const text = 'Welcome Back';
            // let userFirstName = resultAuth?.firstname;
            // let userLastName = resultAuth?.lastname;
            // let emailStructure = welcomeBack(getUserDate, getUserTime, userFirstName, userLastName)
            // await mailController.createMail(emailStructure, resultAuth, req, text)


            console.log("security in the code for the user ..", resultAuth)
            return jsonOne<IUserInterface>(res, 200, resultAuth);
            
        } catch (error) {
            
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {

        try {
            const userRepository: IUserRepository = new UserRepository();
            let resultAuth = await userRepository.getAllUsers(
                req
            )

            const { users, meta } = resultAuth
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
            return jsonOne<IUserInterface>(res, 200, resultAuth);

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