import express from 'express';
import cors from 'cors';
import http from 'http';
import { json } from 'body-parser';
import { subscriberPostRouteHandler } from './routes/resultsMapRouteHandler';
const packageJson = require('../package.json');

export function createApp(): { app: express.Application; server: http.Server } {
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

    app.get('/events');

    app.post('/subscribers', subscriberPostRouteHandler);

    return {
        app,
        server,
    };
}
