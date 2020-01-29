import { Event } from '../model/Event';

type CompareResult = 1 | -1 | 0;

export function compareEventsbyDate(event1?: Event | string, event2?: Event | string): CompareResult {
    if (typeof event1 === 'string') event1 = undefined;
    if (typeof event2 === 'string') event2 = undefined;
    return compareDates(event1 ? event1.dateToCompare : undefined, event2 ? event2.dateToCompare : undefined);
}

export function compareDates(date1 = new Date(), date2 = new Date()): CompareResult {
    try {
        const delta = ((new Date(date2) as any) as number) - ((new Date(date1) as any) as number);

        if (delta > 0) {
            return -1;
        } else if (delta < 0) {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.warn(error);
        return -1;
    }
}
