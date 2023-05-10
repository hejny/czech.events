import { RequestHandler } from 'express';
import { v4 } from 'uuid';
import { Subscriber } from '../../src/model/database/Subscriber';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { connectionPromise } from '../database';

export const postSubscriberRouteHandler: RequestHandler = async (request, response, next) => {
    try {
        const connection = await connectionPromise;
        // TODO: Purge internal IDs
        const subscriber = constructObjectFromJSON(Subscriber, request.body);
        subscriber.created = new Date();
        subscriber.uuid = v4();

        const insertResult = await connection.manager.insert(Subscriber, subscriber);

        if (insertResult.identifiers.length !== 1) {
            throw new Error(`No inserted row`);
        }
        const insertedSubscriber = await connection.manager.findOne(Subscriber, insertResult.identifiers[0].id);

        // TODO: Purge internal IDs
        return response.send(insertedSubscriber);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.send({
            error: error.message,
        });
        // TODO: some error
    }
};
