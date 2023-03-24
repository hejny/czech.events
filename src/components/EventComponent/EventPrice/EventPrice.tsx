import { Event } from '../../../model/database/Event';
import { translateCurrency } from '../../../utils/translate';

interface IEventPriceProps {
    event: Event;
    price?: number;
}

// TODO: Component name suffix to all components
export function EventPrice({ event, price }: IEventPriceProps) {
    if (!price) price = event.price || undefined;
    if (price === null || price === undefined) return <></>;
    if (price === 0) return <>💸&nbsp;Zdarma</>;
    return <>💸&nbsp;{`${Math.ceil(price * 100) / 100} ${translateCurrency(event.priceCurrency!)}`}</>;
}
