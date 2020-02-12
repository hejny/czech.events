import { RequestHandler } from 'express';
import { Subscriber } from '../model/Subscriber';

export const subscriberPostRouteHandler: RequestHandler = async (request, response, next) => {
    const subscriber = new Subscriber(request.body);

    response.send(await Subscriber.query().insert(subscriber));
};
