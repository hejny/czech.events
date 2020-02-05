import { htmlToPdfRouteHandler } from './htmlToPdfRouteHandler';
import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { json } from 'body-parser';
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

    app.get('/html/pdf', htmlToPdfRouteHandler);

    app.get('/kill', () => {
        process.exit();
    });

    return {
        app,
        server,
    };
}
