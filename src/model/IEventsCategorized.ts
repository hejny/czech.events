import { Event } from './database/Event';
export interface IEventsCategorized {
    [eventType: string]: (string | Event)[];
}
