import { Subscriber } from '../../src/model/database/Subscriber';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { RequestHandler } from 'express';
import { databaseConnectionPromise } from '../database';

export const subscriberPostRouteHandler: RequestHandler = async (request, response, next) => {
    const databaseConnection = await databaseConnectionPromise;
    // TODO: Purge internal IDs
    const subscriber = constructObjectFromJSON(Subscriber, request.body);
    subscriber.created = new Date();
    const insertResult = await databaseConnection.manager.insert(Subscriber, subscriber);

    if (insertResult.identifiers.length === 1) {
        const subscriber = await databaseConnection.manager.findOne(Subscriber, insertResult.identifiers[0].id);
        //console.log('subscriber', subscriber);
        // TODO: Purge internal IDs
        return response.send(subscriber);
    } else {
        return null;
        // TODO: some error
    }
};
