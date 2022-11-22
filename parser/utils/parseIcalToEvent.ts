import ical from 'ical';
import { parseCity } from '../../server/utils/parsing/city/parseCity';
import { parseCancel } from '../../server/utils/parsing/parseCancel';
import { parseEventType } from '../../server/utils/parsing/parseEventType';
import { parseKeywordsFromIcalEvent } from '../../server/utils/parsing/parseKeywordsFromIcalEvent';
import { parseNameAndTopic } from '../../server/utils/parsing/parseNameAndTopic';
import { parseOnline } from '../../server/utils/parsing/parseOnline';
import { parseTimesAndDates } from '../../server/utils/parsing/parseTimesAndDates';
import { Event } from '../../src/model/database/Event';

type IParseIcalInput = { type: 'VEVENT' } & Pick<
    ical.CalendarComponent,
    'type' | 'start' | 'end' | 'status' | 'summary' | 'description' | 'class' | 'geo' | 'location' | 'url' | 'uid'
>;

export function parseIcalToEvent(icalEvent: IParseIcalInput): Partial<Event> {
    try {
        const serializeId: string = icalEvent.uid; /* <- TODO: Should be this processed by parseSerializeId? */

        const { days, startDate, durationInHours } = parseTimesAndDates({ icalEvent });
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        const { keywords, keywordsFromName, keywordsFromDescription } = parseKeywordsFromIcalEvent({
            icalEvent,
        });
        const { type } = parseEventType({ keywordsFromName, keywordsFromDescription, icalEvent, durationInHours });
        const { online } = parseOnline({ icalEvent, keywords });
        const { canceled } = parseCancel({ icalEvent, keywords });
        const { name, topic } = parseNameAndTopic(icalEvent.summary);
        // [0] const { price, priceCurrency } = parsePrice({ icalEvent, keywords });
        const { city } = parseCity({ icalEvent, keywords });

        // TODO: To special parse
        let time = `${startDate.getHours().toString().padStart(2, '0')}:${startDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        if (time === '00:00') {
            time = null;
        }

        let web = icalEvent.url;
        web = web.split('m.facebook.com').join('www.facebook.com');

        return {
            serializeId,
            name,
            topic,
            type,
            web,
            city,
            year,
            month,
            days,
            time,
            // TODO: [0] price,
            // TODO: [0] priceCurrency,
            // TODO: visibility,
            online: online ? 1 : 0,
            canceled: canceled ? 1 : 0,
        };
    } catch (error) {
        console.error(error);
        console.info({ icalEvent });
        throw new Error(`Can not parse Event from ICal`);
    }
}

/**
 *  TODO: [0] Price is not in Ical and should be probbably scraped by puppeteer
 */
