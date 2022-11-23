import { Event, EventType } from '../../src/model/database/Event';
import { IJsonldEvent } from '../interfaces/jsonld/IJsonldEvent';

export const _EVENTBRITE_SAMPLE_JSONLD: IJsonldEvent = {
    '@context': 'http://schema.org',
    '@type': 'EducationEvent',
    startDate: '2021-02-25T18:00:00+01:00',
    endDate: '2021-02-25T20:00:00+01:00',
    name: 'Online iOS Talk: Hands-on Mac Catalyst',
    url: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
    image:
        'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F125491075%2F183275801523%2F1%2Foriginal.20210208-140842?w=1000&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=90110bb2a6ff4438e155a71ae44f5542',
    eventStatus: 'https://schema.org/EventScheduled',
    offers: [
        {
            availabilityEnds: '2021-02-25T16:00:00Z',
            priceCurrency: 'CZK',
            url: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
            lowPrice: 0,
            highPrice: 0,
            '@type': 'AggregateOffer',
            availabilityStarts: '2021-02-08T15:00:00Z',
            validFrom: '2021-02-08T15:00:00Z',
            availability: 'InStock',
        },
        {
            availabilityEnds: '2021-02-25T16:00:00Z',
            name: 'iOS Enthusiast',
            priceCurrency: 'CZK',
            url: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
            price: 0,
            '@type': 'Offer',
            availabilityStarts: '2021-02-08T15:00:00Z',
            validFrom: '2021-02-08T15:00:00Z',
            availability: 'InStock',
        },
    ],
    location: {
        url: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
        '@type': 'VirtualLocation',
    },
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',

    organizer: {
        url: 'https://www.eventbrite.com/o/strv-11110244091',
        description:
            ' \r\nSTRV is a software design & engineering team. Using our 16 years of experience and the power of technology, we can unlock any business opportunity. With offices in the US and Europe and more than 190 experts on our side, we design and develop digital solutions for the bravest startups and Fortune 500 companies.\r\n ',
        '@type': 'Organization',
        name: 'STRV',
    },

    description:
        "We'd like to invite you to our ONLINE iOS Talk with Jan Kaltoun, who will tell you a little bit more about Mac Catalyst.",
};

export const _EVENTBRITE_SAMPLE_EVENT: Partial<Event> = {
    serializeId: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
    name: 'iOS Talk',
    topic: 'Hands–on Mac Catalyst',
    type: EventType.MEETUP,
    web: 'https://www.eventbrite.com/e/online-ios-talk-hands-on-mac-catalyst-tickets-140831903013',
    city: null,
    year: 2021,
    month: 2,
    days: '25',
    time: '18:00',
    price: 0,
    priceCurrency: null,
    online: 1,
    canceled: 0,
};
