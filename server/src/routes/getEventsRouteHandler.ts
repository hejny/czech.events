import { RequestHandler } from 'express';
import { Event } from '../model/Event';

// TODO: In future here can be option to put there an filters
export const getEventsRouteHandler: RequestHandler = async (request, response, next) => {
    response.send(
        await Event.query()
            .select()
            .where({}),
    );
};
