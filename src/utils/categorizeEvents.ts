import { IEvents } from './fetchEvents';
import { Event } from '../model/Event';

export interface IEventsCategorized {
    [eventType: string]: (string | Event)[];
}

export function categorizeEvents(events: IEvents): IEventsCategorized {
    const eventsCategorized: IEventsCategorized = {};
    for (const eventOrError of events) {
        let type: string;
        if (eventOrError instanceof Event) {
            type = eventOrError.type;
        } else {
            type = 'errors';
        }

        eventsCategorized[type] = eventsCategorized[type] || [];
        eventsCategorized[type].push(eventOrError);
    }

    return eventsCategorized;
}
