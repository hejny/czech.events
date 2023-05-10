import { EventType } from '../model/database/Event';
import { NewsletterContentPosition } from '../model/database/NewsletterContent';

export function eventTypeToNewsletterContentPosition(eventType: EventType): NewsletterContentPosition {
    switch (eventType) {
        case EventType.CONFERENCE:
            return NewsletterContentPosition.HEAD_CONFERENCES;
        case EventType.MEETUP:
            return NewsletterContentPosition.HEAD_MEETUPS;
        case EventType.WORKSHOP:
            return NewsletterContentPosition.HEAD_WORKSHOPS;
        case EventType.HACKATHON:
            return NewsletterContentPosition.HEAD_HACKATHONS;
        default:
            throw new Error(`Can not convert "${eventType}" into NewsletterContentPosition.`);
    }
}
