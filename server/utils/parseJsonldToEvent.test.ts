import { _EVENTBRITE_SAMPLE_EVENT, _EVENTBRITE_SAMPLE_JSONLD } from 'server/tests/tests-typing/eventbrite';
import { _FACEBOOK_SAMPLE_EVENT, _FACEBOOK_SAMPLE_JSONLD } from 'server/tests/tests-typing/facebook';
import { _KATALOGAKCI_SAMPLE_EVENT, _KATALOGAKCI_SAMPLE_JSONLD } from 'server/tests/tests-typing/katalogakci';
import { _MEETUP_SAMPLE_EVENT, _MEETUP_SAMPLE_JSONLD } from 'server/tests/tests-typing/meetup';
import { parseJsonldToEvent } from './parseJsonldToEvent';

describe('how parsing events from JSON+LD works', () => {
    it('can parse Eventbrite event', () => {
        expect(parseJsonldToEvent(_EVENTBRITE_SAMPLE_JSONLD)).toEqual(_EVENTBRITE_SAMPLE_EVENT);
    });
    it('can parse Facebook event', () => {
        expect(parseJsonldToEvent(_FACEBOOK_SAMPLE_JSONLD)).toEqual(_FACEBOOK_SAMPLE_EVENT);
    });
    it('can parse KatalogAkci event', () => {
        expect(parseJsonldToEvent(_KATALOGAKCI_SAMPLE_JSONLD)).toEqual(_KATALOGAKCI_SAMPLE_EVENT);
    });
    it('can parse Meetup event', () => {
        expect(parseJsonldToEvent(_MEETUP_SAMPLE_JSONLD)).toEqual(_MEETUP_SAMPLE_EVENT);
    });
});