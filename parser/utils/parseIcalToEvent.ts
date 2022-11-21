import ical from 'ical';
import { Event } from '../../src/model/database/Event';

type IParseIcalInput = { type: 'VEVENT' } & Pick<
    ical.CalendarComponent,
    'type' | 'start' | 'end' | 'status' | 'summary' | 'description' | 'class' | 'geo' | 'location' | 'url' | 'uid'
>;

export function parseIcalToEvent(ical: IParseIcalInput): Partial<Event> {
    const { uid } = ical;

    const serializeId: string = uid;
    // const name: string = /* <- TODO: Implement */ ;
    // const topic: string | null = /* <- TODO: Implement */ ;
    // const type: EventType = /* <- TODO: Implement */ ;
    // const web: string | null = /* <- TODO: Implement */ ;
    // const city: string | null = /* <- TODO: Implement */ ;
    // const year: number | null = /* <- TODO: Implement */ ;
    // const month: number | null = /* <- TODO: Implement */ ;
    // const days: string | null = /* <- TODO: Implement */ ;
    // const time: string | null = /* <- TODO: Implement */ ;
    // const price: number | null = /* <- TODO: Implement */ ;
    // const priceCurrency: EventPriceCurrency | null = /* <- TODO: Implement */ ;
    // const visibility: EventVisibility = /* <- TODO: Implement */ ;
    // const canceled: number | null = /* <- TODO: Implement */ ;
    // const online: number | null = /* <- TODO: Implement */ ;

    return {
        serializeId,
        // TODO: name,
        // TODO: topic,
        // TODO: type,
        // TODO: web,
        // TODO: city,
        // TODO: year,
        // TODO: month,
        // TODO: days,
        // TODO: time,
        // TODO: price,
        // TODO: priceCurrency,
        // TODO: visibility,
        // TODO: canceled,
        // TODO: online,
    };
}
