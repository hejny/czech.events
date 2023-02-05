import { parseSerializeId } from './parseSerializeId';

describe('how parsing serialize ID works', () => {
    it('can parsing serialize ID from Facebook', () => {
        expect(parseSerializeId(`https://www.facebook.com/events/3777829932317644`)).toEqual(
            `https://www.facebook.com/events/3777829932317644`,
        );

        expect(parseSerializeId(`https://m.facebook.com/events/3777829932317644`)).toEqual(
            `https://www.facebook.com/events/3777829932317644`,
        );

        expect(
            parseSerializeId(
                `https://www.facebook.com/events/3777829932317644/?acontext=%7B%22ref%22%3A%2252%22%2C%22action_history%22%3A%22[%7B%5C%22surface%5C%22%3A%5C%22share_link%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22share_link%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22invite_link_id%5C%22%3A423278699060892%7D%7D]%22%7D`,
            ),
        ).toEqual(`https://www.facebook.com/events/3777829932317644`);
    });
});
