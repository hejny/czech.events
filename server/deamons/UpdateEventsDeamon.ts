import { connectionPromise } from '../database';
import { extractJsonldFromUrl } from '../utils/extractJsonldFromUrl';
import { parseJsonldToEvent } from '../utils/parseJsonldToEvent';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { forTime, forTimeSynced } from 'waitasecond';
import { In, MoreThanOrEqual } from 'typeorm';

export class UpdateEventsDeamon {
    // TODO: Maybe extend from some generic IDestroyable class/interface

    constructor() {
        this.init();
    }

    private async init() {
        const connection = await connectionPromise;
        while (true) {
            await forTimeSynced(5 * 60 * 1000);

            let lastEvent = await connection.manager.findOne(Event, {
                where: {
                    visibility: In([EventVisibility.VISIBLE, EventVisibility.FEATURED]),
                    month: MoreThanOrEqual(new Date().getMonth() + 1),
                    year: MoreThanOrEqual(new Date().getFullYear()),
                    // TODO: Maybe also check a date
                },
                order: { updated: 'ASC' },
            });

            if (!lastEvent || !lastEvent.web) continue;

            console.info(`Updating`, lastEvent.name);
            //console.log(`updating`, lastEvent);

            let eventData: Partial<Event>;
            try {
                const jsonld = await extractJsonldFromUrl(lastEvent.web);
                eventData = await parseJsonldToEvent(jsonld, lastEvent.web);
            } catch (error) {
                eventData = {
                    /*
                TODO: Maybe not
                canceled: 1
            */
                };
            }

            //console.log(`new info`, eventData);

            const updateResult = await connection
                .createQueryBuilder()
                .update(Event)
                .set({ ...eventData, updated: 'CURRENT_TIMESTAMP' })
                .where({ serializeId: lastEvent.serializeId })
                .limit(1)
                .execute();

            //console.log(`updateResult`, updateResult);

            //break;
        }
    }
}
