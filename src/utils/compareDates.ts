import { Event } from '../model/database/Event';

type CompareResult = 1 | -1 | 0;

export function compareEventsbyDate(event1?: Event, event2?: Event): CompareResult {
    return compareDates(event1.dateToCompare, event2.dateToCompare);
}

export function compareDates(date1: Date, date2: Date): CompareResult {
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
        if (!(error instanceof Error)) {
            throw error;
        }

        console.warn(error);
        return -1;
    }
}
