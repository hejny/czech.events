import { RequestHandler } from 'express';
import ical from 'ical-generator';
import moment from 'moment';
import { In } from 'typeorm';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { connectionPromise } from '../database';

export const getExportIcalRouteHandler: RequestHandler = async (request, response, next) => {
    const extension = request.path.match(/\.(?<extension>[a-zA-Z0-9]+)$/)?.groups?.extension;
    const mimeType = extension === 'txt' ? 'text/plain' : 'text/calendar';

    try {
        const connection = await connectionPromise;
        const events = await connection.manager.find(Event, {
            where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) },
        });

        const calendar = ical({ name: 'Czech.events', prodId: '//pavolhejny.com//Czech.events//EN' });

        for (const event of events) {
            console.log(event.name, event.date);
            try {
                if (event.date === null) {
                    continue;
                }

                calendar.createEvent({
                    start: moment(event.date /* !!! Include time into event.date */),
                    // TODO: !! Also include end> end: moment().add(1, 'hour'),

                    // TODO: Some universal util how to join featured+name+topic into summary
                    summary: event.name + ' – ' + event.topic,

                    // !! TODO: Scrape descriptions
                    // !! description: '',
                    location: event.city,
                    url: event.web,
                    id: event.serializeId /* TODO: !!! Make here some normalization + mix with Czech events */,
                });
            } catch (error) {
                console.error(`Can not create calendar event for ${event.name}\n${error.message}`);
                // throw new Error(`Can not create calendar event for ${event.name}\n${error.message}`);
            }
        }

        // TODO: Download as some nice branded filename
        return response
            .type(mimeType)
            .header('Content-Disposition', 'inline')
            .send(calendar.toString() /*.replace(/^PRODID\:.*$/m, 'PRODID:-//czech.events/')*/);
    } catch (error) {
        // console.error(error);
        return response.status(400).send({ error: { name: error.name, message: error.message, ...error } });
    }
};
