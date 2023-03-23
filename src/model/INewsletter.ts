import { NewsletterContent } from './database/NewsletterContent';
import { IEventsCategorized } from './IEventsCategorized';

export interface INewsletter {
    categorizedEvents: IEventsCategorized;
    newsletterContents: NewsletterContent[];
}
