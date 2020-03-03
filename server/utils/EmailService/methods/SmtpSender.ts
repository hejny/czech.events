import { Email } from '../../../../src/model/database/Email';
import { IEmailServiceSender } from './IEmailServiceSender';
import nodemailer from 'nodemailer';
import { stripHTMLTags } from '../stripHTMLTags';
import { ISmtpConnectionConfig } from '../ISmtpConnectionConfig';

// TODO: Maybe delete emailjs
export class SmtpSender implements IEmailServiceSender {
    constructor(private config: ISmtpConnectionConfig) {}

    async send(email: Email) {
        try {
            const transporter = nodemailer.createTransport({
                host: this.config.host,
                //secure: true,
                auth: {
                    user: this.config.user,
                    pass: this.config.password,
                },
                //tls: {
                //    rejectUnauthorized: false,
                //},
            });
            const result = await transporter.sendMail({
                from: email.from,
                to: email.to,
                subject: email.subject,
                text: stripHTMLTags(email.body),
                html: email.body.split('\n').join('<br/>'),
            });

            //console.log('result', result);

            return {
                email_id: email.id,
                success: true,
                message: result.response,
            };
        } catch (error) {
            return {
                email_id: email.id,
                success: false,
                message: error.message,
            };
        }
    }
}
