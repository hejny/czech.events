import { Event } from '../../../src/model/database/Event';
import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';
import { decodeHexDeep } from './../decodeHexDeep';
import { parseCancel } from './parseCancel';
import { parseCity } from './parseCity';
import { parseEventType } from './parseEventType';
import { parseKeywords } from './parseKeywords';
import { parseNameAndTopic } from './parseNameAndTopic';
import { parseOnline } from './parseOnline';
import { parsePrice } from './parsePrice';
import { parseSerializeId } from './parseSerializeId';
import { parseTimesAndDates } from './parseTimesAndDates';

export function parseJsonldToEvent({
    semanticEvent,
    url,
}: {
    semanticEvent: ISemanticEvent;
    url?: string;
}): Partial<Event> {
    try {
        // TODO: Volumes "11. Sraz přátel PHP v Pardubicích" vs "FuckUp Night  Vol. XXXVI" ,...
        // TODO: Price is not in JSON LD and should be probbably scraped by puppeteer

        semanticEvent = decodeHexDeep(semanticEvent);
        const { serializeId } = parseSerializeId({ semanticEvent, url });
        const { days, startDate, durationInHours } = parseTimesAndDates({ semanticEvent });
        const { keywords } = parseKeywords({ semanticEvent });
        const { type } = parseEventType({ semanticEvent, keywords, durationInHours });
        const { online } = parseOnline({ semanticEvent, keywords });
        const { canceled } = parseCancel({ semanticEvent, keywords });
        const { name, topic } = parseNameAndTopic(semanticEvent.name);
        const { price, priceCurrency } = parsePrice({ semanticEvent, keywords });
        const { city } = parseCity({ semanticEvent });

        return {
            serializeId,
            name,
            topic,
            type,
            web: url || semanticEvent.url,
            city,
            year: startDate.getFullYear(),
            month: startDate.getMonth() + 1,
            days,
            time: `${startDate.getHours().toString().padStart(2, '0')}:${startDate
                .getMinutes()
                .toString()
                .padStart(2, '0')}`,
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
        throw new Error(`Can not create Event`);
    }
}
