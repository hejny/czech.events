import { Subscriber } from '../../src/model/database/Subscriber';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';

export const subscriberPostRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const subscriber = constructObjectFromJSON(Subscriber, request.body);

    const subscriberInserted = await connection.manager.insert(Subscriber, subscriber);

    response.send(subscriberInserted);
};
