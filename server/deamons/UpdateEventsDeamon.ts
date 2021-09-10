import fetch from 'node-fetch';
import { In, MoreThanOrEqual } from 'typeorm';
import { forTime, forTimeSynced } from 'waitasecond';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { connectionPromise } from '../database';
import { extractJsonldFromHtml } from '../utils/extractJsonldFromHtml';
import { parseJsonldToEvent } from '../utils/parsing/parseJsonldToEvent';

export class UpdateEventsDeamon {
    // TODO: Maybe extend from some generic IDestroyable class/interface

    public async run(all: boolean) {
        while (true) {
            await forTimeSynced(1 /* minutes */ * 60 * 1000);
            // TODO: forTimeSyncedRandomDeterministic
            await this.one(all);
            //break;
        }
    }

    public async quick(all: boolean) {
        let firstUpdated: string;
        while (true) {
            await forTime(10);

            const lastupdated = await this.one(all);

            if (!firstUpdated && lastupdated) {
                firstUpdated = lastupdated;
            } else if (firstUpdated === lastupdated) {
                const WAIT_HOURS = 5;
                console.info(`⌛ Future events updated, waiting ${WAIT_HOURS} hours to next update`);
                await forTime(WAIT_HOURS * 3600 * 1000);
            }
        }
    }

    public async one(all: boolean): Promise<string | null> {
        const connection = await connectionPromise;

        const where = {
            visibility: In([EventVisibility.VISIBLE, EventVisibility.FEATURED]),
            month: MoreThanOrEqual(new Date().getMonth() + 1),
            year: MoreThanOrEqual(new Date().getFullYear()),
            // TODO: Maybe also check a date
        };

        if (all) {
            delete where.month;
            delete where.year;
        }

        let lastEvent = await connection.manager.findOne(Event, {
            where,
            order: { updated: 'ASC' },
        });

        if (!lastEvent || !lastEvent.web) return null;

        console.info(`Updating`, lastEvent.name);
        //console.log(`updating`, lastEvent);

        let eventData: Partial<Event>;
        try {
            /**
             * TODO: Some FB pages do not contains LD+JSON, scrape it with puppeteer:
             * - https://www.facebook.com/events/3945405942253092/
             * - https://www.facebook.com/events/890908898190026
             * - https://www.facebook.com/events/1995761740592210/
             * - https://www.facebook.com/events/222934836388270
             */

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

        delete eventData.serializeId;

        //console.log({ eventData });

        /*const updateResult = */ await connection
            .createQueryBuilder()
            .update(Event)
            .set({ ...eventData, updated: 'CURRENT_TIMESTAMP' })
            .where({ serializeId: lastEvent.serializeId })
            .limit(1)
            .execute();

        return lastEvent.serializeId;
        //console.log(`updateResult`, updateResult);
    }
}
