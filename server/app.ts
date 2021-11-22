import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';

import { adminRouter } from './routes/admin/adminRouter';
import { getEventsRouteHandler } from './routes/getEventsRouteHandler';
import { getExportHtmlRouteHandler } from './routes/getExportHtmlRouteHandler';
import { subscriberPostRouteHandler } from './routes/subscriberPostRouteHandler';

const packageJson = require('../package.json');

export async function createApp(): Promise<{ app: express.Application; server: http.Server }> {
    const app = express();

    app.use(json());
    app.use(cors());

    app.use(adminRouter);

    const server = http.createServer(app);

    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err);
    });

    app.get(['/', '/about'], async (request, response) => {
        response.send({
            version: packageJson.version,
        });
    });

    app.get('/events', getEventsRouteHandler);
    app.post('/subscribers', subscriberPostRouteHandler);
    app.get('/export/html', getExportHtmlRouteHandler);

    return {
        app,
        server,
    };
}
