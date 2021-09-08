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

    // TODO: Make tests for complicated situations like online, canceled event, invalid dated etc...
});
