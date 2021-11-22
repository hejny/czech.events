import { EventPriceCurrency } from '../../../src/model/database/Event';
import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';
import { makeArray } from '../makeArray';

export function parsePrice({ semanticEvent, keywords }: { semanticEvent: ISemanticEvent; keywords: string[] }) {
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
    return { price, priceCurrency };
}
