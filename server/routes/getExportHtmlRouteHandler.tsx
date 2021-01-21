import { RequestHandler } from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { TalksPageEmailEvents } from '../../src/components/TalksPageEmailEvents';
import { createNewsletter } from '../../src/utils/createNewsletter';
import { In } from 'typeorm';

import { Event, EventVisibility } from '../../src/model/database/Event';
import { DateRange } from '../../src/model/DateRange';
import { connectionPromise } from '../database';

export const getExportHtmlRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const events = await connection.manager.find(Event, {
        where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) /* TODO: Is this working? */ },
    });
    // TODO: Purge internal IDs
    // TODO: Remove codes

    const range = DateRange.fromConstants('CURRENT_MONTH', 'NEXT_MONTH');
    const newsletter = createNewsletter({ range, events });
    const html = ReactDOMServer.renderToStaticMarkup(<TalksPageEmailEvents {...{ newsletter }} />);

    response.send(html);
};
