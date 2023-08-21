import MailService from "../../utils/MailService";
import { UserInterface } from "../../interfaces /People/userInterface";
import verifyEmail from "../../templates/verifyEmailTemplate";
import { Request } from "express";

export class MailController {

    async createMail(emailStructiure:any, user: UserInterface, req: Request, text:string) {
        const emailTemplate = emailStructiure;
        const mailService = MailService.getInstance();

        await mailService.sendMail(req.headers['X-Request-Id'], {
            to: user.email,
            subject: text,
            html: emailTemplate.html,
        });

    }
}