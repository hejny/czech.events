import { Event } from './Event';
export interface IEventsCategorized {
    [eventType: string]: (string | Event)[];
}
