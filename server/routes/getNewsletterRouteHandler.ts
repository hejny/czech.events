import { RequestHandler } from 'express';
import { Event } from '../../src/model/database/Event';
import { connectionPromise } from '../database';

// TODO: In future here can be option to put there an filters
export const getNewsletterRouteHandler: RequestHandler = async (request, response, next) => {
    //const connection = await connectionPromise;
    //const events = await connection.manager.find(Event, {});
    // TODO: Purge internal IDs
    // TODO: Remove codes
    //response.send(events);
};
