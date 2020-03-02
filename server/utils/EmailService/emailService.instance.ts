import {
    EMAIL_LIMIT_SEND_FREQUENCY,
    EMAIL_LIMIT_IN_ONE_TICK,
    EMAIL_LIMIT_RETRY_AFTER,
    EMAIL_LIMIT_LIVETIME,
    EMAIL_LIMIT_RETRIES,
} from '../../config';
import { EmailService } from './EmailService';

export const emailService = new EmailService({
    /*smtpConnection: {
        user: EMAIL_USER,
        password: EMAIL_PASSWORD,
        host: EMAIL_HOST,
        ...EMAIL_ADDITIONAL_CONFIG,
    },*/
    limits: {
        // TODO: To config
        sendFrequency: EMAIL_LIMIT_SEND_FREQUENCY,
        emailsInOneTick: EMAIL_LIMIT_IN_ONE_TICK,
        retryAfter: EMAIL_LIMIT_RETRY_AFTER,
        emailLivetime: EMAIL_LIMIT_LIVETIME,
        retries: EMAIL_LIMIT_RETRIES,
    },
});
