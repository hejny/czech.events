import ical from 'ical';
import { parseKeywords } from 'n12';
import { parseCity } from '../../server/utils/parsing/city/parseCity';
import { parseCancel } from '../../server/utils/parsing/parseCancel';
import { parseEventType } from '../../server/utils/parsing/parseEventType';
import { parseNameAndTopic } from '../../server/utils/parsing/parseNameAndTopic';
import { parseOnline } from '../../server/utils/parsing/parseOnline';
import { parseTimesAndDates } from '../../server/utils/parsing/parseTimesAndDates';
import { Event } from '../../src/model/database/Event';

type IcalEventForParsing = { type: 'VEVENT' } & Pick<
    ical.CalendarComponent,
    'type' | 'start' | 'end' | 'status' | 'summary' | 'description' | 'class' | 'geo' | 'location' | 'url' | 'uid'
>;

export function parseIcalEventToEvent(icalEvent: IcalEventForParsing): Partial<Event> {
    try {
        const serializeId: string = icalEvent.uid; /* <- TODO: Should be this processed by parseSerializeId? */

        const { name, topic } = parseNameAndTopic(icalEvent.summary);

        const startDate = icalEvent.start;
        const endDate = icalEvent.end || icalEvent.start;
        const { days, durationInHours, year, month } = parseTimesAndDates({ startDate, endDate });

        const keywords = parseKeywords(icalEvent);
        const keywordsFromName = parseKeywords(name);
        const keywordsFromDescription = parseKeywords({ topic, escription: icalEvent.description });

        console.log('!!!', { keywords, keywordsFromName, keywordsFromDescription });

        const { type } = parseEventType({ keywordsFromName, keywordsFromDescription, durationInHours });
        const { online } = parseOnline({ keywords });
        const { canceled } = parseCancel({ keywords });

        // [0] const { price, priceCurrency } = parsePrice({ icalEvent, keywords });
        const { city } = parseCity({ keywords });

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
        throw new Error(`Can not parse Event from Ical`);
    }
}

/**
 *  TODO: [0] Price is not in Ical and should be probbably scraped by puppeteer
 */
