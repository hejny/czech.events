import { createConnection } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './config';
import { Event } from '../src/model/database/Event';

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
    entities: [Event],
    // TODO: migrations: [],
    // TODO: subscribers: [],
});
