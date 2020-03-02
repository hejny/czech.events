import { emailService } from '../EmailService/emailService.instance';
import { NewsletterService } from './NewsletterService';

export const newsletterService = new NewsletterService(emailService);
