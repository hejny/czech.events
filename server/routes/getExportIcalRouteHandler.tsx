import { RequestHandler } from 'express';
import { In } from 'typeorm';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { DateRange } from '../../src/model/DateRange';
import { createNewsletter } from '../../src/utils/createNewsletter';
import { connectionPromise } from '../database';

export const getExportIcalRouteHandler: RequestHandler = async (request, response, next) => {
    try {
        const connection = await connectionPromise;
        const events = await connection.manager.find(Event, {
            where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) /* TODO: Is this working? */ },
        });
        // TODO: Purge internal IDs
        // TODO: Remove codes

        const rangeString = request.query.range; /* TODO: when vs. range */

        const range = DateRange.fromConstant((rangeString as any) || 'CURRENT_MONTH-NEXT_MONTH');
        const newsletter = createNewsletter({ range, events });

        return response.send({ newsletter });
    } catch (error) {
        // console.error(error);
        return response.status(400).send({ error: { name: error.name, message: error.message, ...error } });
    }
};
