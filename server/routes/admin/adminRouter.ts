import { NextFunction, Request, Response, Router, RequestHandler } from 'express';

import { ADMIN_TOKEN } from './../../config';
import { connectionPromise } from '../../database';
import { Event } from '../../../src/model/database/Event';
import fetch from 'node-fetch';
import { extractJsonldFromUrl } from '../../utils/extractJsonldFromUrl';
import { parseJsonldToEvent } from '../../utils/parseJsonldToEvent';

export const adminRouter = Router();

adminRouter.use('/admin/*', (request: Request, response: Response, next: NextFunction) => {
    if (!ADMIN_TOKEN) {
        return response.status(403).send({
            message:
                'When you want to use debug functions set ADMIN_TOKEN config value and sent it through GET param token ...?token=.',
        });
    }
    if (request.query.token !== ADMIN_TOKEN) {
        return response.status(403).send({
            //a: request.query.token,
            //b: ADMIN_TOKEN,
            message: 'GET param token ...?token= is not equal as ADMIN_TOKEN in the config.',
        });
    }
    return next();
});

adminRouter.get('/admin/events', async (request, response) => {
    // TODO: To separate file

    const connection = await connectionPromise;

    let event = await connection.manager.findOne(Event, {
        where: { serializeId: request.query.serializeId },
    });

    if (!event) {
        if (!request.query.fetch) {
            return response.status(404).send({ message: `Event not found and fetch param is not set.` });
        } else {
            const jsonld = await extractJsonldFromUrl(request.query.serializeId);
            const eventData = await parseJsonldToEvent(jsonld, request.query.serializeId);

            await connection.manager.insert(Event, eventData);

            event = await connection.manager.findOne(Event, {
                where: { serializeId: request.query.serializeId },
            });
        }
    }

    return response.send(event);
});

adminRouter.put('/admin/events', async (request, response) => {
    const connection = await connectionPromise;

    const updateResult = await connection.manager.update(
        Event,
        {
            where: { serializeId: request.query.serializeId },
            limit: 1,
        },
        request.body,
    );

    console.log(`updateResult`, updateResult);

    return response.send(updateResult);
});

adminRouter.use('/admin/*', (request, response) => {
    return response.status(404).send({ message: `Route "${request.baseUrl}" not found in debug part of the API.` });
});
