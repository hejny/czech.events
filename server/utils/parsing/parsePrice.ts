import { IKeywords } from 'n12';
import { EventPriceCurrency } from '../../../src/model/database/Event';
import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';
import { makeArray } from '../makeArray';

export function parsePrice({ jsonldEvent, keywords }: { jsonldEvent: IJsonldEvent; keywords: IKeywords }) {
    let price: null | number = null;
    let priceCurrency: null | EventPriceCurrency = null;
    const bestOffer = makeArray(jsonldEvent.offers)
        .map((offer) => {
            // @ts-ignore
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
        if (keywords.has('zdarma') || keywords.has('free')) price = 0;
    }
    return { price, priceCurrency };
}
