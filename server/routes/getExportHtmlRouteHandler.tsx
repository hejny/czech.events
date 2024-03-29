import { RequestHandler } from 'express';
import { promises as fsp } from 'fs';
import { join } from 'path';
import prettier from 'prettier';
import ReactDOMServer from 'react-dom/server';
import { In } from 'typeorm';
import { NewsletterComponent } from '../../src/components/NewsletterComponent/NewsletterComponent';
import { Event, EventVisibility } from '../../src/model/database/Event';
import { DateRange } from '../../src/model/DateRange';
import { createNewsletter } from '../../src/utils/createNewsletter';
import { connectionPromise } from '../database';

const { readFile } = fsp; // TODO: } from 'fs/promises';

export const getExportHtmlRouteHandler: RequestHandler = async (request, response, next) => {
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
        const content = ReactDOMServer.renderToStaticMarkup(<NewsletterComponent {...{ newsletter }} />);
        const style = await readFile(join(__dirname, '../../src/style/newsletter.css'));
        const html = `${content}<style>${style}</style>`;
        return response.send(prettier.format(html, { parser: 'html' }));
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }
        // @ts-ignore
        return response.status(400).send({ error: { name: error.name, message: error.message, ...error } });
    }
};
