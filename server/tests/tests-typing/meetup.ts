import { IJsonLd } from '../../interfaces/jsonld/IJsonLd';

export const _MEETUP_SAMPLE_JSONLD: IJsonLd = {
    '@context': 'http://schema.org',
    '@type': 'Event',
    name: 'Online iOS Talk: Hands-on Mac Catalyst',
    url: 'https://www.meetup.com/STRV-Meetups/events/276248017/',
    description:
        "We'd like to invite you to our ONLINE iOS Talk with Jan Kaltoun, who will tell you a little bit more about Mac Catalyst.\n\nMany of us have heard about Mac Catalyst, but only a few of us have had the chance to play with it in a real app. For this event, let’s take a simple app built for iOS and convert it to macOS to see how Mac Catalyst works in a real-life scenario. We’ll be live-coding in an existing codebase to get as close to porting a production app as possible.\n\n---\n\nPlease register at our ",
    startDate: '2021-02-25T18:00+01:00',
    endDate: '2021-02-25T20:00+01:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: { '@type': 'VirtualLocation', url: 'https://www.meetup.com/STRV-Meetups/events/276248017/' },
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        validFrom: '2020-03-24',
        availability: 'https://schema.org/InStock',
    },
    organizer: { '@type': 'Organization', name: 'STRV Meetups', url: 'https://www.meetup.com/STRV-Meetups/' },
};

export const _MEETUP_SAMPLE_EVENT: Partial<Event> = {
    // TODO: !!! fill
    serializeId: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
    name: 'Zn&#xE1;m&#xE9; vlastnosti Azure Storage',
    topic: null,
    type: EventType.CONFERENCE,
    web: 'https://it.katalogakci.cz/e-1583/ne-zname-vlastnosti-azure-storage-jiri-cincura-mvp',
    city: undefined,
    year: NaN,
    month: NaN,
    days: 'NaN-NaN',
    time: 'NaN:NaN',
    price: null,
    priceCurrency: null,
    online: 0,
    canceled: 0,
};
