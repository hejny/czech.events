import { Email } from '../../../../src/model/database/Email';
import { IEmailServiceSender } from './IEmailServiceSender';

// TODO: Casing in the name
export class GnumailutilsSender implements IEmailServiceSender {
    async send(email: Email) {
        // TODO: implement
        return {};
    }
}
