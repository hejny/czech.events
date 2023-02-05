import { Event } from '../model/database/Event';
import { NewsletterContent } from '../model/database/NewsletterContent';
import { INewsletter } from '../model/INewsletter';
import { DateRange } from '../model/DateRange';
import { categorizeEvents } from '../utils/categorizeEvents';
import { compareEventsbyDate } from '../utils/compareDates';

export function createNewsletter({ events, range }: { events: Event[]; range: DateRange }): INewsletter {
    const filteredEvents = events
        //.filter((event) => (event instanceof Event ? event.inMail : true))
        .filter((event) => (event instanceof Event ? range.isIn(event.dateToCompare) : true))
        .sort((a, b) => compareEventsbyDate(a, b));

    const categorizedEvents = categorizeEvents(filteredEvents);

    const newsletterContents: NewsletterContent[] = [];
    for (const event of filteredEvents) {
        newsletterContents.push(...event.newsletterContents);
    }

    return { categorizedEvents, newsletterContents };
}
