import { RequestHandler } from 'express';
import { In } from 'typeorm';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { connectionPromise } from '../database';

// TODO: In future here can be option to put there an filters
export const getEventsRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const events = await connection.manager.find(Event, {
        where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) /* TODO: Is this working? */ },
    });
    // TODO: Purge internal IDs
    // TODO: Remove codes
    response.send(events);
};
