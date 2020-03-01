import { Email } from '../../../../src/model/database/Email';
import { EmailAttempt } from '../../../../src/model/database/EmailAttempt';

export interface IEmailServiceSender {
    send: (email: Email) => Promise<Partial<EmailAttempt>>;
}
