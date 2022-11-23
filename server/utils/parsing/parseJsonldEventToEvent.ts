import { Event } from '../../../src/model/database/Event';
import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';
import { decodeHexDeep } from '../decodeHexDeep';
import { parseCity } from './city/parseCity';
import { parseCancel } from './parseCancel';
import { parseEventType } from './parseEventType';
import { parseKeywordsFromSemanticEvent } from './parseKeywordsFromSemanticEvent';
import { parseNameAndTopic } from './parseNameAndTopic';
import { parseOnline } from './parseOnline';
import { parsePrice } from './parsePrice';
import { parseSerializeId } from './parseSerializeId';
import { parseTimesAndDates } from './parseTimesAndDates';

export function parseJsonldEventToEvent({
    semanticEvent,
    url,
}: {
    semanticEvent: ISemanticEvent;
    url?: string;
}): Partial<Event> {
    try {
        // TODO: Price is not in JSON LD and should be probbably scraped by puppeteer

        semanticEvent = decodeHexDeep(semanticEvent);
        semanticEvent = { description: '', ...semanticEvent };

        const serializeId = parseSerializeId(url || semanticEvent.url);
        const { days, startDate, durationInHours } = parseTimesAndDates({ semanticEvent });
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        const { keywords, keywordsFromName, keywordsFromDescription } = parseKeywordsFromSemanticEvent({
            semanticEvent,
        });
        const { type } = parseEventType({ keywordsFromName, keywordsFromDescription, semanticEvent, durationInHours });
        const { online } = parseOnline({ semanticEvent, keywords });
        const { canceled } = parseCancel({ semanticEvent, keywords });
        const { name, topic } = parseNameAndTopic(semanticEvent.name);
        const { price, priceCurrency } = parsePrice({ semanticEvent, keywords });
        const { city } = parseCity({ semanticEvent, keywords });

        // TODO: To special parse
        let time = `${startDate.getHours().toString().padStart(2, '0')}:${startDate
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
        if (time === '00:00') {
            time = null;
        }

        let web = url || semanticEvent.url;
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
        console.info({ semanticEvent });
        throw new Error(`Can not parse Event from JSON+LD`);
    }
}
