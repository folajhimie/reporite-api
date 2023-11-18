import MailService from "../../utils/MailService";
import { IUserInterface } from "../../interfaces/People/userInterface";
import verifyEmail from "../../views/verifyEmailTemplate";
import { Request } from "express";

export class MailController {

    async createMail(emailStructure:any, user: IUserInterface, req: Request, text:string) {
        const emailTemplate = emailStructure;
        const mailService = MailService.getInstance();

        await mailService.sendMail(req.headers['X-Request-Id'], {
            to: user.email,
            subject: text,
            html: emailTemplate.html,
        });

    }
}