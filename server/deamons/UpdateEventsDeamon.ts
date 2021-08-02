import fetch from 'node-fetch';
import { In, MoreThanOrEqual } from 'typeorm';
import { forTime, forTimeSynced } from 'waitasecond';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { connectionPromise } from '../database';
import { extractJsonldFromHtml } from '../utils/extractJsonldFromHtml';
import { parseJsonldToEvent } from '../utils/parsing/parseJsonldToEvent';

export class UpdateEventsDeamon {
    // TODO: Maybe extend from some generic IDestroyable class/interface

    public async run() {
        while (true) {
            await forTimeSynced(60 /* minutes */ * 60 * 1000);
            // TODO: forTimeSyncedRandomDeterministic
            await this.one();
            //break;
        }
    }

    public async quick() {
        while (true) {
            await forTime(10);
            await this.one();
        }
    }

    public async one() {
        const connection = await connectionPromise;
        let lastEvent = await connection.manager.findOne(Event, {
            where: {
                visibility: In([EventVisibility.VISIBLE, EventVisibility.FEATURED]),
                month: MoreThanOrEqual(new Date().getMonth() + 1),
                year: MoreThanOrEqual(new Date().getFullYear()),
                // TODO: Maybe also check a date
            },
            order: { updated: 'ASC' },
        });

        if (!lastEvent || !lastEvent.web) return;

        console.info(`Updating`, lastEvent.name);
        //console.log(`updating`, lastEvent);

        let eventData: Partial<Event>;
        try {
            const jsonld = await extractJsonldFromHtml(await (await fetch(lastEvent.web)).text());
            eventData = await parseJsonldToEvent({ semanticEvent: jsonld, url: lastEvent.web });
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
    }
}
