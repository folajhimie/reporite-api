
// SMTP_HOST=smtp-relay.sendinblue.com
// SMTP_PORT=587
// SMTP_USERNAME=chiragmehta900@gmail.com
// SMTP_PASSWORD=xxxxxxxxxxxxxxxxxxxxxx
// SMTP_SENDER=somnium_nostri@snproweb.com

import nodemailer, { Transporter } from 'nodemailer';

import Logging from '../Library/Logging';
import { MailInterface } from '../interfaces/Utility/mailInterface';
import dotenv from 'dotenv';

dotenv.config();


export default class MailService {
    private static instance: MailService;
    private static transporter: Transporter;

    // private constructor() {}
    // private constructor(transporter: any) {
    //     this.transporter = transporter;
    // }

    //INSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }
    //CREATE CONNECTION FOR LOCAL
    async createLocalConnection() {
        let account = await nodemailer.createTestAccount();
        MailService.transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    }

    //CREATE A CONNECTION FOR LIVE
    async createConnection() {
        MailService.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT), // Parse the port as a number
            secure: process.env.SMTP_TLS === 'yes' ? true : false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }
    //SEND MAIL
    async sendMail(
        requestId: string | number | string[] | any,
        options: MailInterface | any
    ) {
        console.log("request in the mail...", requestId, options, process.env.SMTP_SENDER, options.from);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST as string, // SMTP server address (usually mail.your-domain.com)
            port: 465, // Port for SMTP (usually 465)
            secure: true, // Usually true if connecting to port 465
            auth: {
                user: process.env.MAIL_USERNAME as string,
                pass: process.env.MAIL_PASSWORD as string,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
                Logging.info(`${requestId} - Mail sent successfully!!`);
                Logging.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
                if (process.env.NODE_ENV === 'local') {
                    Logging.info(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
                        info
                    )}`);
                }
                return info;
            }
        });

        // return await MailService.transporter
        //     .sendMail({
        //         from: `"carTtel" ${process.env.SMTP_SENDER || options.from}`,
        //         to: options.to,
        //         cc: options.cc,
        //         bcc: options.bcc,
        //         subject: options.subject,
        //         text: options.text,
        //         html: options.html,
        //     })
        //     .then((info) => {
        //         Logging.info(`${requestId} - Mail sent successfully!!`);
        //         Logging.info(`${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`);
        //         if (process.env.NODE_ENV === 'local') {
        //             Logging.info(`${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
        //                 info
        //             )}`);
        //         }
        //         return info;
        //     });
    }
    //VERIFY CONNECTION
    async verifyConnection() {
        return MailService.transporter.verify();
    }
    //CREATE TRANSPORTER
    getTransporter() {
        return MailService.transporter;
    }
}



