import { RequestHandler } from 'express';
import * as React from 'react';
import { promises as fsp } from 'fs';
import { join } from 'path';
import prettier from 'prettier';
import ReactDOMServer from 'react-dom/server';
import { NewsletterComponent } from '../../src/components/NewsletterComponent';
import { createNewsletter } from '../../src/utils/createNewsletter';
import { In } from 'typeorm';

import { Event, EventVisibility } from '../../src/model/database/Event';
import { DateRange } from '../../src/model/DateRange';
import { connectionPromise } from '../database';

const { readFile } = fsp; // TODO: } from 'fs/promises';

export const getExportHtmlRouteHandler: RequestHandler = async (request, response, next) => {
    const connection = await connectionPromise;
    const events = await connection.manager.find(Event, {
        where: { visibility: In([EventVisibility.FEATURED, EventVisibility.VISIBLE]) /* TODO: Is this working? */ },
    });
    // TODO: Purge internal IDs
    // TODO: Remove codes

    const range = DateRange.fromConstants('CURRENT_MONTH', 'NEXT_MONTH');
    const newsletter = createNewsletter({ range, events });
    const content = ReactDOMServer.renderToStaticMarkup(<NewsletterComponent {...{ newsletter }} />);
    const style = await readFile(join(__dirname, '../../src/style/newsletter.css'));
    const html = `${content}<style>${style}</style>`;
    response.send(prettier.format(html, { parser: 'html' }));
};
