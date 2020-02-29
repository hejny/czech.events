import { EMAIL_ADDITIONAL_CONFIG, EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } from '../../config';
import { EmailService } from './EmailService';

export const emailService = new EmailService({
    connection: {
        user: EMAIL_USER || undefined,
        password: EMAIL_PASSWORD || undefined,
        host: EMAIL_HOST,
        ...EMAIL_ADDITIONAL_CONFIG,
    },
    limits: {
        // TODO: To config
        sendFrequency: 60, // In seconds
        emailsInOneTick: 2,
        retryAfter: 60 * 60, // In seconds
        emailLivetime: 60 * 60 * 24 * 3, // In seconds
        retries: 3,
    },
});
