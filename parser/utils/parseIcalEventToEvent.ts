import ical from 'ical';
import { parseKeywords } from 'n12';
import { parseCity } from '../../server/utils/parsing/city/parseCity';
import { parseCancel } from '../../server/utils/parsing/parseCancel';
import { parseEventType } from '../../server/utils/parsing/parseEventType';
import { parseNameAndTopic } from '../../server/utils/parsing/parseNameAndTopic';
import { parseOnline } from '../../server/utils/parsing/parseOnline';
import { parseTimesAndDates } from '../../server/utils/parsing/parseTimesAndDates';
import { Event } from '../../src/model/database/Event';

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
            icalEvent[key] = icalEventRaw[key];
        }

        const serializeId: string = icalEvent.uid; /* <- TODO: Should be this processed by parseSerializeId? */

        const { name, topic } = parseNameAndTopic(icalEvent.summary);

        const startDate = icalEvent.start;
        const endDate = icalEvent.end || icalEvent.start;
        const { days, durationInHours, year, month } = parseTimesAndDates({ startDate, endDate });

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

        // !!! Check some essentials - maybe in external util
        // !!! Do not allow empty names
        /*
          if (newEvent.serializeId.length < 3) {
            // !!! Do this checking in external util
            console.info(chalk.red(`${newEvent.name} has strange serializeId "${newEvent.serializeId}"`));
            continue;
        }
        */

        return {
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
        };
    } catch (error) {
        console.error(error);
        console.info({ icalEventRaw });
        throw new Error(`Can not parse Event from Ical`);
    }
}

/**
 *  TODO: [0] Price is not in Ical and should be probbably scraped by puppeteer
 */
