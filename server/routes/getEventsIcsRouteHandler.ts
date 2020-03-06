import { RequestHandler } from 'express';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { databaseConnectionPromise } from '../database';
import { In } from 'typeorm';

// @see https://icalendar.org/validator.html#results

// TODO: Generally: Should be route RegExps / strings in the main code or above the route?
//:calendarId is for trancking
// TODO: Can I somehow use named parameters? /^\/calendars\/(?<calendarId>.*)\.ics$/
export const getEventsIcsRoute = /^\/calendars\/(.*)(\.ics(\.txt)?)$/;

// TODO: In future here can be option to put there an filters
export const getEventsIcsRouteHandler: RequestHandler = async (request, response, next) => {
    const calendarId = request.params[0];
    const extension = request.params[1];

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

    switch (extension) {
        case '.ics':
            return response.type('text/calendar').send(ics);
        //case '.txt':
        case '.ics.txt':
            return response.type('text/plain').send(ics);
        default:
            // TODO: Unused
            return response.status(404).send(`Unknown extension ${extension} for calendar.`);
    }
};
