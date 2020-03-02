import express from 'express';
import cors from 'cors';
import http from 'http';
import { json } from 'body-parser';
import { subscriberPostRouteHandler } from './routes/subscriberPostRouteHandler';
import { getEventsRouteHandler } from './routes/getEventsRouteHandler';
import { getNewslettersRouteHandler } from './routes/getNewsletterRouteHandler';
import { getNewsletterRouteHandler } from './routes/getNewsletterRouteHandler';
const packageJson = require('../package.json');

export async function createApp(): Promise<{ app: express.Application; server: http.Server }> {
    const app = express();

    app.use(json());
    app.use(cors());

    const server = http.createServer(app);

    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err);
    });

    app.get(['/', '/about'], async (request, response) => {
        response.send({
            version: packageJson.version,
        });
    });

    // TODO: In future go only through newsletter route
    app.get('/events', getEventsRouteHandler);
    app.get('/newsletters', getNewslettersRouteHandler);
    app.get('/newsletters/:uuid', getNewsletterRouteHandler);
    app.post('/subscribers', subscriberPostRouteHandler);

    return {
        app,
        server,
    };
}
