import * as React from 'react';
import { Event } from '../model/database/Event';
import { isNullOrUndefined } from 'util';
import { translateCurrency } from '../utils/translate';

interface IEventPriceProps {
    event: Event;
    price?: number;
}

export function EventPrice({ event, price }: IEventPriceProps) {
    if (!price) price = event.priceAmount;
    if (isNullOrUndefined(price)) return <></>;
    if (price === 0) return <>💸&nbsp;Zdarma</>;
    return <>💸&nbsp;{`${Math.ceil(price * 100) / 100} ${translateCurrency(event.priceCurrency!)}`}</>;
}
