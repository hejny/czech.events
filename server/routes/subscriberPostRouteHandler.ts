import { Subscriber } from '../../src/model/database/Subscriber';
import { constructObjectFromJSON } from '../../src/utils/constructObjectFromJSON';
import { RequestHandler } from 'express';
import { connectionPromise } from '../database';
import sendgrid from '@sendgrid/helpers';
import sendgridClient from '@sendgrid/client';
import uuid from 'uuid';

export const subscriberPostRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    // TODO: Purge internal IDs
    const subscriber = constructObjectFromJSON(Subscriber, request.body);
    subscriber.created = new Date();
    subscriber.uuid = uuid.v4();
    const insertResult = await connection.manager.insert(Subscriber, subscriber);

    sendgrid.helpers.


    if (insertResult.identifiers.length === 1) {
        const subscriber = await connection.manager.findOne(Subscriber, insertResult.identifiers[0].id);
        //console.log('subscriber', subscriber);
        // TODO: Purge internal IDs
        return response.send(subscriber);
    } else {
        return null;
        // TODO: some error
    }
};



