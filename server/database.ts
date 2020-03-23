import { createConnection, Connection } from 'typeorm';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_LOGGING, DB_SYNCHRONIZE } from './config';

// TODO: remove knex and objection
// TODO: In future use top level await
export const databaseConnectionPromise: Promise<Connection> = createConnection({
    type: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: DB_SYNCHRONIZE,
    logging: DB_LOGGING,
    entities: [],
    // TODO: migrations: [],
    // TODO: subscribers: [],
});
