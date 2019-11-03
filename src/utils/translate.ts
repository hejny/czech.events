import { EventPriceCurrency } from './../model/Event';

export function translateCurrency(currency: EventPriceCurrency): string {
    switch (currency) {
        case 'CZK' as any:
        case EventPriceCurrency.CZK:
            return 'Kč';
        case 'EUR' as any:
        case EventPriceCurrency.EUR:
            return '‎€';
        default:
            return currency;
    }
}
