import MailService from "../../utils/MailService";
import { IUserInterface } from "../../interfaces/People/userInterface";
import verifyEmail from "../../views/verifyEmailTemplate";
import { Request } from "express";
import dotenv from 'dotenv';
dotenv.config();


export class MailController {

    async createMail(emailStructure:any, user: IUserInterface, req: Request | any, text:string) {
        const emailTemplate = emailStructure;
        // const mailService  = new MailService();
        const mailService = MailService.getInstance();

        // console.log("mail servive...", mailService, req.headers['X-Request-Id']);
        const sent_from = `CarTtel 🏬 <${process.env.MAIL_USERNAME}>`;

        await mailService.sendMail(req.headers, {
            to: user.email,
            from: sent_from,
            subject: text,
            html: emailTemplate.html,
        });

    }
}