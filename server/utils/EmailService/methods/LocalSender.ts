import { Email } from '../../../../src/model/database/Email';
import { IEmailServiceSender } from './IEmailServiceSender';
import nodemailer from 'nodemailer';
import { stripHTMLTags } from '../stripHTMLTags';

// TODO: Maybe delete
// TODO: Casing in the name
export class LocalSender implements IEmailServiceSender {
    async send(email: Email) {
        try {
            const transporter = nodemailer.createTransport({ sendmail: true });
            const result = await transporter.sendMail({
                from: email.from,
                to: email.to,
                subject: email.subject,
                text: stripHTMLTags(email.body),
                html: email.body.split('\n').join('<br/>'),
            });

            console.log('result', result);

            return {
                email_id: email.id,
                success: true,
                message: '',
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
