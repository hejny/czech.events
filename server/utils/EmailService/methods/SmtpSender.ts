import { Email } from '../../../../src/model/database/Email';
import { IEmailServiceSender } from './IEmailServiceSender';
import { ISmtpConnectionConfig } from '../ISmtpConnectionConfig';
import { stripHTMLTags } from '../stripHTMLTags';
import { EmailAttempt } from '../../../../src/model/database/EmailAttempt';
const email = require('emailjs'); // TODO: Is there some better library? - nodemailer?

// TODO: Casing in the name
export class SmtpSender implements IEmailServiceSender {
    private smtpClient: any;

    constructor(config: ISmtpConnectionConfig) {
        this.smtpClient = email.server.connect(config);
    }

    async send(email: Email): Promise<Partial<EmailAttempt>> {
        try {
            await new Promise((resolve, reject) => {
                const messageWithAttachment = {
                    from: email.from,
                    to: email.to,
                    subject: email.subject,
                    text: stripHTMLTags(email.body),
                    attachment: [
                        {
                            data: email.body.split('\n').join('<br/>'),
                            alternative: true,
                        },
                    ],
                };

                this.smtpClient.send(messageWithAttachment, (error: any, result: any) =>
                    error ? reject(error) : resolve(result),
                );
            });

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
