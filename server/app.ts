import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
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

    return {
        app,
        server,
    };
}
