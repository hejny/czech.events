import { parseIcalEventToEvent } from './parseIcalEventToEvent';

describe('how parsing events from ical works', () => {
    it('can parse Meetup event', () => {
        expect(
            parseIcalEventToEvent({
                type: 'VEVENT',
                start: new Date('2022-11-24T17:00:00.000Z'),
                end: new Date('2022-11-24T21:00:00.000Z'),
                status: 'CONFIRMED',
                summary: 'STRV Backend Meetup - How We Build Backend PRG',
                description:
                    'STRV Meetups\nThursday, November 24 at 6:00 PM\n\n**(https://www.eventbrite.com/e/backend-meetup-how-we-build-backend-prg-tickets-464986867237?aff=meetup)** Curious about how we build backend solution...\n\nhttps://www.meetup.com/strv-meetups/events/289663632/',
                class: 'PUBLIC',
                geo: {
                    lat: 50.08,
                    lon: 14.43,
                },
                location: 'STRV Prague (Rohanske nabrezi 678/23, Prague, Czech Republic)',
                url: 'https://www.meetup.com/strv-meetups/events/289663632/',
                uid: 'event_289663632@meetup.com',
            }),
        ).toEqual({
            serializeId: 'event_289663632@meetup.com',
        });
    });
});

/**
 * TODO: !!!! Make Meetup
 * TODO: !!!! Make Facebook
 * TODO: All platforms
 */
