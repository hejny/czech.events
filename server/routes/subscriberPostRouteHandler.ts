import { Subscriber } from '../../src/model/database/Subscriber';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';

export const subscriberPostRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const subscriber = constructObjectFromJSON(Subscriber, request.body);
    subscriber.created = new Date();
    const insertResult = await connection.manager.insert(Subscriber, subscriber);

    if (insertResult.identifiers.length === 1) {
        const subscriber = await connection.manager.findOne(Subscriber, insertResult.identifiers[0].id);
        //console.log('subscriber', subscriber);
        return response.send(subscriber);
    } else {
        return null;
        // TODO: some error
    }
};
