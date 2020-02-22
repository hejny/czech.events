import { Event } from '../../server/database/Event';
export interface IEventsCategorized {
    [eventType: string]: (string | Event)[];
}
