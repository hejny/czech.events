import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from(process.env);

export const PORT = config
    .get('PORT')
    .number()
    .default(3001).value!;

//Database
export const DB_HOST = config.get('DB_HOST').required().value;
export const DB_USER = config.get('DB_USER').required().value;
export const DB_PASSWORD = config.get('DB_PASSWORD').required().value;
export const DB_NAME = config.get('DB_NAME').required().value;
