import { Newsletter } from './../../src/model/database/Newsletter';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';

// TODO: In future here can be option to put there an filters
export const getNewsletterRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const { year, month } = request.params;

    const newsletters = await connection.manager.find(Newsletter, { where: { year, month } });

    if (newsletters.length === 1) {
        // TODO: Purge internal IDs
        // TODO: Remove codes
        return response.send(newsletters[0]);
    } else {
        //throw new Error(`Found ${newsletters.length} newsletters not 1.`);
        return response.status(404).send({ message: `Found ${newsletters.length} newsletters not 1.` });
        // TODO: some error
    }
};
