import { Event, EventType } from '../../src/model/database/Event';
import { ISemanticEvent } from '../interfaces/jsonld/ISemanticEvent';

export const _KATALOGAKCI_SAMPLE_JSONLD: ISemanticEvent = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Frontendisti.cz Praha - Hospodsk&#xFD; sraz 09.06.2021',
    description:
        '&lt;p&gt;POZOR! P&#x159;&#xE1;tel&#xE9;, hled&#xE1;me nov&#xE9; prostory, proto&#x17E;e na&#x161;e obl&#xED;ben&#xE1; Pinta - pivn&#xED; steakhouse je zav&#x159;en&#xE1;. Bohu&#x17E;el to vypad&#xE1;, &#x17E;e natrvalo. :-( Pokud v&#xED;te o vhodn&#xE9;m prostoru, nebojte se na n&#xE1;s obr&#xE1;tit a n&#x11B;co n&#xE1;m doporu&#x10D;it.&lt;/p&gt;&#xD;&#xA;&lt;p&gt;Hospodsk&#xFD; sraz. Kr&#xE1;tk&#xE9; p&#x159;edn&#xE1;&#x161;ky a pivo &#x1F37B;. P&#x159;ihlaste svou kr&#xE1;tkou p&#x159;edn&#xE1;&#x161;ku!&lt;/p&gt;',
    url: 'https://it.katalogakci.cz/e-1461/frontendisti-cz-praha--hospodsky-sraz-09-06-2021',
    eventStatus: 'EventScheduled',
    eventAttendanceMode: 'OfflineEventAttendanceMode',
    startDate: '2021-06-09T18:30:00&#x2B;02:00',
    endDate: '2021-06-09T20:30:00&#x2B;02:00',
    location: {
        '@type': 'Place',
        name: 'Praha',
        url: 'https://it.katalogakci.cz/p-73/praha',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Praha ',
            addressLocality: 'Praha',
            postalCode: '',
            addressCountry: '&#x10C;esko',
        },
        geo: { '@type': 'GeoCoordinates', latitude: '50.075538', longitude: '14.437800' },
    },
    image: 'https://it.katalogakci.cz/Attachment/Image/106',
    organizer: { '@type': 'Organization', name: 'Frontendisti.cz Praha', url: 'https://www.meetup.com/frontendisti/' },
};

export const _KATALOGAKCI_SAMPLE_EVENT: Partial<Event> = {
    serializeId: 'https://it.katalogakci.cz/e-1461/frontendisti-cz-praha--hospodsky-sraz-09-06-2021',
    name: 'Frontendisti.cz',
    topic: 'Hospodský sraz',
    type: EventType.MEETUP,
    web: 'https://it.katalogakci.cz/e-1461/frontendisti-cz-praha--hospodsky-sraz-09-06-2021',
    city: 'Praha',
    year: 2021,
    month: 6,
    days: '9',
    time: '18:30',
    price: null,
    priceCurrency: null,
    online: 0,
    canceled: 0,
};

// TODO: Make database of internal knowlage - like we know that all meetups from Frontendisti are free but this is not exported into semantic data
