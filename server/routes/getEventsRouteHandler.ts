import { RequestHandler } from 'express';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { databaseConnectionPromise } from '../database';
import { In } from 'typeorm';

// TODO: In future here can be option to put there an filters
export const getEventsRouteHandler: RequestHandler = async (request, response, next) => {
    const databaseConnection = await databaseConnectionPromise;
    const events = await databaseConnection.manager.find(Event, {
        where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) /* TODO: Is this working? */ },
    });
    // TODO: Purge internal IDs
    // TODO: Remove codes
    response.send(events);
};
