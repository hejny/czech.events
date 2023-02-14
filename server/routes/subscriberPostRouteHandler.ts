import { Subscriber } from '../../src/model/database/Subscriber';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';
import { v4 } from 'uuid';

export const subscriberPostRouteHandler: RequestHandler = async (request, response, next) => {
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
        console.error(error);
        return response.send({
            error:
                'Omlouváme se, ale něco se pokazilo\n Vyzkoušejte se přihlásit později nebo mi napište na pavol@hejny.org',
        });
        // TODO: some error
    }
};
