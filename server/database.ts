import { createConnection } from 'typeorm';
import { Event } from '../src/model/database/Event';
import { EventCode } from './../src/model/database/EventCode';
import { NewsletterContent } from './../src/model/database/NewsletterContent';
import { Subscriber } from './../src/model/database/Subscriber';
import { EventSource } from './../src/model/database/EventSource';
import { DB_HOST, DB_LOGGING, DB_NAME, DB_PASSWORD, DB_SYNCHRONIZE, DB_USER } from './config';

// TODO: remove knex and objection
// TODO: In future use top level await
export const connectionPromise = createConnection({
    type: 'mysql',
    timezone: 'Z',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: DB_SYNCHRONIZE,
    logging: DB_LOGGING,
    entities: [Event, EventCode, NewsletterContent, Subscriber, EventSource],
    // TODO: migrations: [],
    // TODO: subscribers: [],
});
