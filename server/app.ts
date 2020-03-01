import express from 'express';
import cors from 'cors';
import http from 'http';
import { json } from 'body-parser';
import { subscriberPostRouteHandler } from './routes/subscriberPostRouteHandler';
import { getEventsRouteHandler } from './routes/getEventsRouteHandler';
import { getNewsletterRouteHandler } from './routes/getNewsletterRouteHandler';
import { emailServicePromise } from './utils/EmailService/emailService.instance';
import { EMAIL_USER } from './config';
const packageJson = require('../package.json');

export async function createApp(): Promise<{ app: express.Application; server: http.Server }> {
    const app = express();
    app.use(json());
    app.use(cors());

    const emailService = await emailServicePromise;

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
    app.get('/newsletters/:year/:month', getNewsletterRouteHandler);
    app.post('/subscribers', subscriberPostRouteHandler);

    app.get('/debug/mail/status', async (request, response) => {
        response.json(await emailService.getStatus());
    });

    app.get('/debug/mail/tick', async (request, response) => {
        response.json(await emailService.sendingTick());
    });

    app.get('/debug/mail/test/:to', (request, response) => {
        const to = request.params.to;
        emailService.send({
            from: EMAIL_USER,
            to,
            subject: 'Test',
            body: `
            <p>
            Testing an email service.
            <hr/>
            <b>bold text</b>
            <i>italic text</i>
            </p>            
            `.trim(),
        });

        response.send({ message: `Send testing email to ${to}.` });
    });

    return {
        app,
        server,
    };
}
