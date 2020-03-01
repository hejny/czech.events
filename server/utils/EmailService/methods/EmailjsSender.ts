import { Email } from '../../../../src/model/database/Email';
import { IEmailServiceSender } from './IEmailServiceSender';
import { ISmtpConnectionConfig } from '../ISmtpConnectionConfig';
import { stripHTMLTags } from '../stripHTMLTags';
const email = require('emailjs'); // TODO: Is there some better library?

// TODO: Casing in the name
export class EmailjsSender implements IEmailServiceSender {
    private smtpClient: any;

    constructor(config: ISmtpConnectionConfig) {
        this.smtpClient = email.server.connect(config);
    }

    async send(email: Email) {
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
                emailId: email.id,
                success: true,
                message: '',
            };
        } catch (error) {
            return {
                emailId: email.id,
                success: false,
                message: error.message,
            };
        }
    }
}
