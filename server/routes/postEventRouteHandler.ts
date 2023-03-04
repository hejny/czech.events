import { Event, EventVisibility } from '../../src/model/database/Event';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';
import { v4 } from 'uuid';
import spaceTrim from 'spacetrim';

export const postEventRouteHandler: RequestHandler = async (request, response, next) => {
    try {
        const connection = await connectionPromise;
        // TODO: Purge internal IDs
        const event = constructObjectFromJSON(Event, request.body) as Event;

        // @ts-ignore
        delete event.id;
        // TODO: delete event.uuid;
        // TODO: event.uuid = v4();
        event.serializeId = event.web + `#proposal-at-${new Date().toISOString()}`;
        // name	varchar(300)
        // topic	varchar(500) NULL
        // type	enum('CONFERENCE','MEETUP','WORKSHOP','HACKATHON')
        // web	varchar(1000) NULL
        // city	varchar(200) NULL
        // year	year(4) NULL
        // month	int(11) NULL
        // days	varchar(5) NULL
        // time	varchar(8) NULL	TODO: Maybe this should be type time
        // price	int(11) NULL
        // priceCurrency	enum('CZK','EUR','USD') NULL
        event.visibility = EventVisibility.PENDING;
        // canceled	tinyint(2) NULL
        // online	tinyint(2) NULL
        event.note = spaceTrim(
            (block) => `

                Proposed from web
                ${block(event.note || '')}
        `,
        );
        event.created = new Date();
        // updated

        const insertResult = await connection.manager.insert(Event, event);

        if (insertResult.identifiers.length !== 1) {
            throw new Error(`No inserted row`);
        }
        const insertedEvent = await connection.manager.findOne(Event, insertResult.identifiers[0].id);

        // TODO: Purge internal IDs
        return response.send(insertedEvent);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.send({
            error: error.message,
        });
    }
};
