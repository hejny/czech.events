import { EventType } from '../../../src/model/database/Event';
import { _CZECHSTARTUPS_SAMPLE_EVENT, _CZECHSTARTUPS_SAMPLE_JSONLD } from '../../mocks/czechstartups';
import { _EVENTBRITE_SAMPLE_EVENT, _EVENTBRITE_SAMPLE_JSONLD } from '../../mocks/eventbrite';
import { _FACEBOOK_SAMPLE_EVENT, _FACEBOOK_SAMPLE_JSONLD } from '../../mocks/facebook';
import { _KATALOGAKCI_SAMPLE_EVENT, _KATALOGAKCI_SAMPLE_JSONLD } from '../../mocks/katalogakci';
import { _MEETUP_SAMPLE_EVENT, _MEETUP_SAMPLE_JSONLD } from '../../mocks/meetup';
import { parseJsonldToEvent } from './parseJsonldToEvent';

describe('how parsing events from JSON+LD works', () => {
    it('can parse Eventbrite event', () => {
        expect(parseJsonldToEvent({ semanticEvent: _EVENTBRITE_SAMPLE_JSONLD })).toEqual(_EVENTBRITE_SAMPLE_EVENT);
    });
    it('can parse Facebook event', () => {
        expect(parseJsonldToEvent({ semanticEvent: _FACEBOOK_SAMPLE_JSONLD })).toEqual(_FACEBOOK_SAMPLE_EVENT);
    });
    it('can parse KatalogAkci event', () => {
        expect(parseJsonldToEvent({ semanticEvent: _KATALOGAKCI_SAMPLE_JSONLD })).toEqual(_KATALOGAKCI_SAMPLE_EVENT);
    });
    it('can parse Meetup event', () => {
        expect(parseJsonldToEvent({ semanticEvent: _MEETUP_SAMPLE_JSONLD })).toEqual(_MEETUP_SAMPLE_EVENT);
    });

    it('can parse Czechstartups.org event', () => {
        expect(
            parseJsonldToEvent({
                url: 'https://www.czechstartups.org/novinky/event/webexpo-2021/',
                semanticEvent: _CZECHSTARTUPS_SAMPLE_JSONLD,
            }),
        ).toEqual(_CZECHSTARTUPS_SAMPLE_EVENT);
    });

    it('can parse Czechstartups.org event #2', () => {
        expect(
            parseJsonldToEvent({
                semanticEvent: {
                    '@context': 'https://schema.org',
                    '@type': 'Event',
                    name: '[ONLINE] CZSK PPUG Setk&#xE1;n&#xED; a pov&#xED;d&#xE1;n&#xED; 10/21',
                    description:
                        '&lt;p&gt;Poj&#x10F;me se pravideln&#x11B; potk&#xE1;vat a sd&#xED;let zku&#x161;enosti z Power Platformy, co n&#xE1;s na n&#xED; bav&#xED;, co n&#xE1;s tr&#xE1;p&#xED; a co nov&#xE9;ho zaj&#xED;mav&#xE9;ho p&#x159;ich&#xE1;z&#xED;. A pokud u&#x17E; n&#xE1;m to n&#x11B;kde re&#xE1;ln&#x11B; b&#x11B;&#x17E;&#xED;, poj&#x10F;me se pochlubit jak je to super!!&lt;br /&gt;Power Automate (Flow), Power Apps, Power BI a Power Virtual Agents.&lt;/p&gt;&#xD;&#xA;&lt;p&gt;Program:&lt;br /&gt;Uk&#xE1;zky novinek z oblasti PP a re&#xE1;ln&#xFD;ch sc&#xE9;n&#xE1;&#x159;&#x16F;&lt;br /&gt;Voln&#xE1; diskuze a p&#x159;&#xED;padn&#xE9; virtu&#xE1;ln&#xED; pivo&lt;/p&gt;&#xD;&#xA;&lt;p&gt;Lokalita:&lt;br /&gt;ONLINE&lt;/p&gt;&#xD;&#xA;&lt;p&gt;Jazyk:&lt;br /&gt;&#x10D;e&#x161;tina&lt;/p&gt;&#xD;&#xA;&lt;p&gt;Ob&#x10D;erstven&#xED;:&lt;br /&gt;Vlastn&#xED;&lt;/p&gt;&#xD;&#xA;&lt;p&gt;&#xDA;rove&#x148;:&lt;br /&gt;100-300&lt;/p&gt;&#xD;&#xA;&lt;p&gt;Tak si pros&#xED;m napl&#xE1;nujte &#x10D;as ve sv&#xFD;ch kalend&#xE1;&#x159;&#xED;ch a p&#x159;ipojte se.&lt;/p&gt;',
                    url: 'https://it.katalogakci.cz/e-1572/online-czsk-ppug-setkani-a-povidani-10-21',
                    eventStatus: 'EventScheduled',
                    eventAttendanceMode: 'OnlineEventAttendanceMode',
                    startDate: '2021-10-14T17:00:00&#x2B;02:00',
                    endDate: '2021-10-14T19:00:00&#x2B;02:00',

                    location: {
                        '@type': 'VirtualLocation',
                        url: 'https://it.katalogakci.cz/e-1572/online-czsk-ppug-setkani-a-povidani-10-21',
                    },
                    image: 'https://it.katalogakci.cz/Attachment/Image/12',
                    organizer: {
                        '@type': 'Organization',
                        name: 'Czech and Slovak Power Platform User Group',
                        url: 'https://www.meetup.com/czskppug/',
                    },
                },
            }),
        ).toEqual({
            serializeId: 'https://it.katalogakci.cz/e-1572/online-czsk-ppug-setkani-a-povidani-10-21',
            name: 'Power platform user group',
            topic: 'Setkání a povídání',
            type: EventType.MEETUP,
            web: 'https://it.katalogakci.cz/e-1572/online-czsk-ppug-setkani-a-povidani-10-21',
            city: null,
            year: 2021,
            month: 10,
            days: '14',
            time: '17:00',
            price: null,
            priceCurrency: null,
            online: 1,
            canceled: 0,
        });
    });

    // TODO: Make tests for complicated situations like online, canceled event, invalid dated etc...
});
