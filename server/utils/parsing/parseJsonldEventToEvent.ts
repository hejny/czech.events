import { Event } from '../../../src/model/database/Event';
import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';
import { decodeHexDeep } from '../decodeHexDeep';
import { parseCity } from './city/parseCity';
import { parseCancel } from './parseCancel';
import { parseEventType } from './parseEventType';
import { parseKeywordsFromJsonldEvent } from './parseKeywordsFromJsonldEvent';
import { parseNameAndTopic } from './parseNameAndTopic';
import { parseOnline } from './parseOnline';
import { parsePrice } from './parsePrice';
import { parseSerializeId } from './parseSerializeId';
import { parseTimesAndDates } from './parseTimesAndDates';

export function parseJsonldEventToEvent({
    jsonldEvent,
    url,
}: {
    jsonldEvent: IJsonldEvent;
    url?: string;
}): Partial<Event> {
    try {
        // TODO: Price is not in JSON LD and should be probbably scraped by puppeteer

        jsonldEvent = decodeHexDeep(jsonldEvent);
        jsonldEvent = { description: '', ...jsonldEvent };

        const serializeId = parseSerializeId(url || jsonldEvent.url);
        const startDate = new Date(jsonldEvent.startDate);
        const endDate = new Date(jsonldEvent.endDate || jsonldEvent.startDate);
        const { days, durationInHours, year, month } = parseTimesAndDates({ startDate, endDate });

        const { keywords, keywordsFromName, keywordsFromDescription } = parseKeywordsFromJsonldEvent({
            jsonldEvent,
        });
        const { type } = parseEventType({ keywordsFromName, keywordsFromDescription, durationInHours });
        const { online } = parseOnline({ jsonldEvent, keywords });
        const { canceled } = parseCancel({ keywords });
        const { name, topic } = parseNameAndTopic(jsonldEvent.name);
        const { price, priceCurrency } = parsePrice({ jsonldEvent, keywords });
        const { city } = parseCity({ jsonldEvent, keywords });

        // TODO: To special parse
        let time = `${startDate.getHours().toString().padStart(2, '0')}:${startDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        if (time === '00:00') {
            time = null;
        }

        let web = url || jsonldEvent.url;
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
            price,
            priceCurrency,
            online: online ? 1 : 0,
            canceled: canceled ? 1 : 0,

            //visibility: EventVisibility;
            //note: string | null;
        };
    } catch (error) {
        console.error(error);
        console.info({ jsonldEvent });
        throw new Error(`Can not parse Event from JSON+LD`);
    }
}
