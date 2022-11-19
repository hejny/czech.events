describe('how parsing events from ical works', () => {
    it('can parse Meetup event', () => {
        expect(parseIcalToEvent({})).toEqual({});
    });
});

/**
 * TODO: !!!! Make Meetup
 * TODO: !!!! Make Facebook
 * TODO: All platforms
 */
