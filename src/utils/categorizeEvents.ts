import { EventType } from "./../model/EventType";
import { IEvents } from '../model/IEvents';
import { Event } from '../model/database/Event';
import { enumToArray } from './enumToArray';
import { IEventsCategorized } from '../model/IEventsCategorized';

export function categorizeEvents(events: IEvents): IEventsCategorized {
    const eventsCategorized: IEventsCategorized = {};

    for (const eventType of enumToArray(EventType)) {
        eventsCategorized[eventType] = [];
    }

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

    const eventsCategorizedFiltered: IEventsCategorized = {};

    for (const eventType of Object.keys(eventsCategorized)) {
        if (eventsCategorized[eventType].length > 0) {
            eventsCategorizedFiltered[eventType] = eventsCategorized[eventType];
        }
    }

    return eventsCategorizedFiltered;
}
