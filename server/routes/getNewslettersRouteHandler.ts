import { Newsletter } from './../../src/model/database/Newsletter';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';

// TODO: In future here can be option to put there an filters
export const getNewslettersRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const newsletters = await connection.manager.find(Newsletter);
    return response.send(newsletters);
};
