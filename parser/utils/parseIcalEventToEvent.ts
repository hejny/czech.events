import ical from 'ical';
import { parseKeywords } from 'n12';
import { parseCity } from '../../server/utils/parsing/city/parseCity';
import { parseCancel } from '../../server/utils/parsing/parseCancel';
import { parseEventType } from '../../server/utils/parsing/parseEventType';
import { parseNameAndTopic } from '../../server/utils/parsing/parseNameAndTopic';
import { parseOnline } from '../../server/utils/parsing/parseOnline';
import { parseTimesAndDates } from '../../server/utils/parsing/parseTimesAndDates';
import { Event } from '../../src/model/database/Event';
import { checkEvent } from './checkEvent';

export type IcalEventForParsing = { type: 'VEVENT' } & Pick<
    ical.CalendarComponent,
    // TODO: [2] DRY
    'type' | 'start' | 'end' | 'summary' | 'description' | 'class' | 'geo' | 'location' | 'url' | 'uid'
>;

export function parseIcalEventToEvent(icalEventRaw: IcalEventForParsing): Partial<Event> {
    try {
        const icalEvent: IcalEventForParsing = {} as any;
        for (const key of [
            // TODO: [2] DRY
            'type',
            'start',
            'end',
            'summary',
            'description',
            'class',
            'geo',
            'location',
            'url',
            'uid',
        ]) {
            // @ts-ignore
            icalEvent[key] = icalEventRaw[key];
        }

        const serializeId: string = icalEvent.uid; /* <- TODO: Should be this processed by parseSerializeId? */

        const { name, topic } = parseNameAndTopic(icalEvent.summary);

        const startDate = icalEvent.start;
        const endDate = icalEvent.end || icalEvent.start;
        const { days, durationInHours, year, month, time } = parseTimesAndDates({ startDate, endDate });

        const keywords = parseKeywords({
            icalEvent,
        });
        const keywordsFromName = parseKeywords(name);
        const keywordsFromDescription = parseKeywords([topic, icalEvent.description]);

        const { type } = parseEventType({ keywordsFromName, keywordsFromDescription, durationInHours });
        const { isOnline } = parseOnline({ keywords });
        const { isCanceled } = parseCancel({ keywords });

        // [0] const { price, priceCurrency } = parsePrice({ icalEvent, keywords });
        const { city } = parseCity({ keywords });

        let web = icalEvent.url;
        web = web.split('m.facebook.com').join('www.facebook.com');

        return checkEvent({
            serializeId /* <- TODO: !! Show email-like strings in Adminer */,
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
            online: isOnline ? 1 : 0,
            canceled: isCanceled ? 1 : 0,
        });
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        console.info({ icalEventRaw });
        throw new Error(`Can not parse Event from Ical`);
    }
}

/**
 *  TODO: [0] Price is not in Ical and should be probbably scraped by puppeteer
 */
