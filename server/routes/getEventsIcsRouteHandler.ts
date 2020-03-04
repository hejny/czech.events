import { RequestHandler } from 'express';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { databaseConnectionPromise } from '../database';
import { In } from 'typeorm';

// TODO: In future here can be option to put there an filters
export const getEventsIcsRouteHandler: RequestHandler = async (request, response, next) => {
    const calendarId = request.params[0];

    // TODO: Track calendarId
    const databaseConnection = await databaseConnectionPromise;
    const events = await databaseConnection.manager.find(Event, {
        where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) /* TODO: Is this working? */ },
    });

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//czech.events//calendar//${calendarId}//CS
${events
    .map((event) => event.ics)
    .filter((ics) => ics)
    .join('\n')}
END:VCALENDAR`;

    response.type('text/calendar').send(ics);
};
