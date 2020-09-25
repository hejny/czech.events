import { extractJsonldFromUrl } from 'server/utils/extractJsonldFromUrl';
import { parseJsonldToEvent } from 'server/utils/parseJsonldToEvent';
import {} from 'wa';
import { forTimeSynced } from 'waitasecond';

export class UpdateEventsDeamon {
    // TODO: Maybe extend from some generic IDestroyable class/interface

    constructor() {
        this.init();
    }

    private async init() {
        const database;
        while (true) {
            await forTimeSynced(5 * 60 * 1000);

            const jsonld = await extractJsonldFromUrl(request.query.serializeId);
            const eventData = await parseJsonldToEvent(jsonld, request.query.serializeId);
        }
    }
}
