import { createConnection } from 'typeorm';
import { Newsletter } from '../src/model/database/Newsletter';
import { Event } from '../src/model/database/Event';
import { EventCode } from './../src/model/database/EventCode';
import { EventNewsletter } from './../src/model/database/EventNewsletter';
import { NewsletterContent } from './../src/model/database/NewsletterContent';
import { Subscriber } from './../src/model/database/Subscriber';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config';

// TODO: remove knex and objection
// TODO: In future use top level await
export const connectionPromise = createConnection({
    type: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: true, // TODO: what is that
    entities: [Event, EventCode, EventNewsletter, NewsletterContent, Newsletter, Subscriber],
    // TODO: migrations: [],
    // TODO: subscribers: [],
});
