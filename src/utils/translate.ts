import { EventPriceCurrency, EventType } from './../model/database/Event';

export function translateCurrency(currency: EventPriceCurrency): string {
    // TODO: Hardcoded
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

export function translateEventType(eventType: EventType): string {
    // TODO: Plular
    // TODO: Hardcoded
    switch (eventType) {
        case EventType.HACKATHON:
            return '🐱‍💻 Hackathony';
        case EventType.CONFERENCE:
            return '📛 Konference';
        case EventType.MEETUP:
            return '🧑🏽‍🤝‍🧑🏽 Meetupy';
        case EventType.WORKSHOP:
            return '🎓 Workshopy';
    }
}
