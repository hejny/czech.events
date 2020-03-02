import { Newsletter } from './../../src/model/database/Newsletter';
import { RequestHandler } from 'express';
import { databaseConnectionPromise } from '../database';

// TODO: In future here can be option to put there an filters
export const getNewslettersRouteHandler: RequestHandler = async (request, response, next) => {
    const databaseConnection = await databaseConnectionPromise;
    const newsletters = await databaseConnection.manager.find(Newsletter);
    return response.send(newsletters);
};
