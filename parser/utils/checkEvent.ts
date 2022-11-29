import { Event } from '../../src/model/database/Event';

/**
 * Check if the event seems OK and if not it throws an error
 *
 * @param event to check
 * @returns same event but now after checking
 */
export function checkEvent<TEvent extends Partial<Event>>(event: TEvent): TEvent {
    if (event.serializeId.length < 3) {
        console.info({ event });
        throw new Error(`Event has strange serializeId "${event.serializeId}"`);
    }

    if (event.name.length < 3) {
        console.info({ event });
        throw new Error(`Event has strange name "${event.name}"`);
    }

    return event;
}
