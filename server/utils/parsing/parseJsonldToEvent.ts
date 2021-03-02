import { Event, EventPriceCurrency, EventType } from '../../../src/model/database/Event';
import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';
import { decodeHexDeep } from './../decodeHexDeep';
import { makeArray } from './../makeArray';
import { parseNameAndTopic } from './parseNameAndTopic';

export function parseJsonldToEvent(semanticEvent: ISemanticEvent, url?: string): Partial<Event> {
    try {
        // TODO: Break into  smaller functions+tests which parse one atomic part of the event like parseNameAndTopic (already is) price, city, etc...
        // TODO: Volumes "11. Sraz přátel PHP v Pardubicích" vs "FuckUp Night  Vol. XXXVI" ,...
        // TODO: Price is not in JSON LD and should be probbably scraped by puppeteer

        semanticEvent = decodeHexDeep(semanticEvent);

        //-----------------[ Common ]---
        const serializeId = new URL(url || semanticEvent.url).toString().replace(/\/$/, '');
        const startDate = new Date(semanticEvent.startDate);
        const endDate = new Date(semanticEvent.endDate || semanticEvent.startDate);

        const days =
            startDate.getDate() === endDate.getDate()
                ? startDate.getDate().toString()
                : `${startDate.getDate()}-${endDate.getDate()}`;
        const durationInHours = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;
        //--------------------

        //-----------------[ Type ]---
        let type = EventType.CONFERENCE;
        // TODO: toLowerCase also for ěščřžýáíéúů
        const keywords = `${semanticEvent.name} ${semanticEvent.description}`.toLowerCase();
        if (keywords.includes('hackathon')) type = EventType.HACKATHON;
        if (keywords.includes('startup weekend')) type = EventType.HACKATHON;
        if (keywords.includes('meetup')) type = EventType.MEETUP;
        if (keywords.includes('sraz')) type = EventType.MEETUP;
        if (keywords.includes('workshop')) type = EventType.WORKSHOP;
        if (keywords.includes('webinář')) type = EventType.WORKSHOP;
        if (keywords.includes('kurz')) type = EventType.WORKSHOP;
        if (durationInHours < 4 && type === EventType.CONFERENCE) type = EventType.MEETUP;
        //--------------------

        //-----------------[ Online ]---
        let online = false;
        if (keywords.includes('online')) online = true;
        if (keywords.includes('stream')) online = true;
        if (keywords.includes('vysílání')) online = true;
        if (keywords.includes('virtuální')) online = true;
        if (keywords.includes('virtual')) online = true;
        if (keywords.includes('webinář')) online = true;
        //--------------------

        //-----------------[ Canceled ]---
        let canceled = false;
        // Probbably? Note: canceled is detected by not fetching JSON LD
        if (keywords.includes('zrušeno')) canceled = true;
        if (keywords.includes('canceled')) canceled = true;
        //--------------------

        const { name, topic } = parseNameAndTopic(semanticEvent.name);

        //-----------------[ Price ]---
        let price: null | number = null;
        let priceCurrency: null | EventPriceCurrency = null;
        const bestOffer = makeArray(semanticEvent.offers)
            .map((offer) => {
                const price = +(offer.price ?? offer.highPrice);
                return {
                    price,
                    priceCurrency: (offer.priceCurrency as EventPriceCurrency) || null,
                };
            })
            .sort((a, b) => (a.price > b.price ? 1 : -1))[0];

        if (bestOffer) {
            price = bestOffer.price;
            priceCurrency = bestOffer.priceCurrency;
        }

        if (price === 0) priceCurrency = null;
        if (price === null) {
            if (keywords.includes('zdarma') || keywords.includes('free')) price = 0;
        }
        //--------------------

        //-----------------[ City ]---
        let city: null | string = null;
        if (semanticEvent?.location?.address?.addressLocality) {
            city = semanticEvent.location.address.addressLocality;
        }
        // TODO: More methods
        //--------------------

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
