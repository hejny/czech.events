import express from 'express';
import cors from 'cors';
import http from 'http';
import { json } from 'body-parser';
import { subscriberPostRouteHandler } from './routes/subscriberPostRouteHandler';
import { getEventsRouteHandler } from './routes/getEventsRouteHandler';
import { getNewslettersRouteHandler } from './routes/getNewsletterRouteHandler';
import { getNewsletterRouteHandler } from './routes/getNewsletterRouteHandler';
import { EMAIL_USER } from './config';
import { emailService } from './utils/EmailService/emailService.instance';
import { newsletterService } from './utils/NewsletterService/NewsletterService.instance';
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

    app.get('/debug/newsletter/status', async (request, response) => {
        response.json(await newsletterService.getStatus());
    });

    app.get('/debug/mail/status', async (request, response) => {
        response.json(await emailService.getStatus());
    });

    app.get('/debug/mail/tick', async (request, response) => {
        response.json(await emailService.sendingTick());
    });

    app.get('/debug/mail/test/:to', async (request, response) => {
        const to = request.params.to;
        await emailService.send({
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

    if (true) {
        await emailService.send({
            from: EMAIL_USER,
            to: 'me@pavolhejny.com',
            subject: 'Test',
            body: 'inline',
        });
        await emailService.sendingTick();
    }

    return {
        app,
        server,
    };
}
