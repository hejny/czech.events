import { RequestHandler } from 'express';
import ical from 'ical-generator';
import moment from 'moment';
import * as React from 'react';
import spaceTrim from 'spacetrim';
import { FindConditions, In } from 'typeorm';
import { EventSummary } from '../../src/components/EventSummary';
import { getEventTags } from '../../src/components/EventTags';
import { getCharForEventTag } from '../../src/components/getCharForEventTag';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { jsxToString } from '../../src/utils/jsxToString';
import { connectionPromise } from '../database';

export const getExportIcalRouteHandler: RequestHandler = async (request, response, next) => {
    const serializeId = request.query.serializeId as string | undefined;
    const { filename, extension } = request.path.match(/(?<filename>[a-zA-Z0-9\-_+\s%]+\.?(?<extension>[a-zA-Z0-9]+))$/)
        ?.groups || {
        filename: 'czech.events.ics',
        extension: 'ics',
    };
    const mimeType = extension === 'ics' ? 'text/calendar' : 'text/plain';

    try {
        const connection = await connectionPromise;

        const where: FindConditions<Event> = { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) };
        if (serializeId) {
            where.serializeId = serializeId;
        }
        const events = await connection.manager.find(Event, {
            where,
        });

        const calendar = ical({ name: 'Czech.events', prodId: '//pavolhejny.com//Czech.events//EN' });

        for (const event of events) {
            //console.log(event.name, event.date);
            try {
                if (event.date === null) {
                    continue;
                }

                calendar.createEvent({
                    start: moment(event.date /* !!! Include time into event.date */),
                    // TODO: !! Also include end> end: moment().add(1, 'hour'),

                    summary: getCharForEventTag(event.type) + jsxToString(EventSummary({ event })),

                    // !! TODO: Scrape descriptions
                    description: spaceTrim(`
                            
                        ${jsxToString(<EventSummary {...{ event }} />)}         
                        ${getEventTags(event)
                            .map(jsxToString)
                            .map((line) => line.trim())
                            .filter((line) => line !== '')
                            .join('\n')})}  
                        
                        ${event.web}
                        ______
                        🌍 Find more events at https://czech.events/
                    
                    
                    `),
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
            .header('Content-Disposition', extension === 'txt' ? 'inline' : `attachment; filename="${filename}"`)
            .send(calendar.toString());
    } catch (error) {
        // console.error(error);
        return response.status(400).send({ error: { name: error.name, message: error.message, ...error } });
    }
};
