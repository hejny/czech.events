import { Event, EventType } from '../../src/model/database/Event';
import { IJsonldEvent } from '../interfaces/jsonld/IJsonldEvent';

export const _CZECHSTARTUPS_SAMPLE_JSONLD: IJsonldEvent = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'WebExpo 2021',
    description:
        'P\u0159ed 30 lety v CERNu nezkoumali jen vznik vesm\u00edru. Kdy\u017e tu 6. srpna 1991 spustil Tim-Berners Lee prvn\u00ed webov\u00e9 str\u00e1nky, za\u017eil zde sv\u016fj velk\u00fd t\u0159esk i web. A sv\u00e9 t\u0159ic\u00e1t\u00e9 narozeniny oslav\u00ed na WebExpu \u2013 nejv\u011bt\u0161\u00ed technologick\u00e9 konferenci ve st\u0159edn\u00ed Evrop\u011b. Ta dnes p\u0159edstavila ofici\u00e1ln\u00ed program sv\u00e9ho 13. ro\u010dn\u00edku, kter\u00fd se bude konat v pra\u017esk\u00e9 Lucern\u011b od 21. do 23. z\u00e1\u0159\u00ed.\u00a0WebExpo\u00a0tentokr\u00e1t p\u0159iv\u00edt\u00e1 70 \u010desk\u00fdch i sv\u011btov\u00fdch technologick\u00fdch celebrit. Poprv\u00e9 se v Praze p\u0159edstav\u00ed opensourcov\u00fd guru Daniel Sternberg, zakladatel n\u00e1stroje cURL, kter\u00fd ka\u017edodenn\u011b vyu\u017e\u00edv\u00e1me v\u0161ichni. Vystoup\u00ed i dom\u00e1c\u00ed legenda Jan Gruntor\u00e1d, kter\u00fd p\u0159ipojil \u010cesko k internetu. Na nostalgii ov\u0161em nebude moc prostoru,\u00a0WebExpo\u00a0se zam\u011b\u0159\u00ed na budoucnost \u2013 dal\u0161\u00edch 30 let webu.V\u00edce informac\u00ed a registrace ZDE.',
    image: 'https://www.czechstartups.org/wp-content/uploads/2021/07/DSC_9624-1024x682-1-219x146.jpg',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    startDate: '2021/09/21',
    endDate: '2021/09/23',
    location: {
        '@type': 'Place',
        name: 'Pal\u00e1c Lucerna',
        address: {
            '@type': 'PostalAddress',
            telephone: '',
            streetAddress: 'Vodi\u010dkova 704/36, 110 00 Nov\u00e9 M\u011bsto',
        },
    },
};

export const _CZECHSTARTUPS_SAMPLE_EVENT: Partial<Event> = {
    serializeId: 'https://www.czechstartups.org/novinky/event/webexpo-2021',
    name: 'WebExpo',
    topic: null,
    type: EventType.CONFERENCE,
    web: 'https://www.czechstartups.org/novinky/event/webexpo-2021/',
    city: 'Praha',
    year: 2021,
    month: 9,
    days: '21-23',
    time: null,
    price: null,
    priceCurrency: null,
    online: 0,
    canceled: 0,
};
