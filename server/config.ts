import { ConfigChecker } from 'configchecker';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });
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

export const DB_LOGGING = config
    .get('DB_LOGGING')
    .boolean()
    .default(false).value!;
export const DB_SYNCHRONIZE = config
    .get('DB_SYNCHRONIZE')
    .boolean()
    .default(false).value!;

//Email SMTP config
export const EMAIL_HOST = config.get('EMAIL_HOST', 'Smtp server').required().value;
export const EMAIL_USER = config.get('EMAIL_USER').required().value;
export const EMAIL_PASSWORD = config.get('EMAIL_PASSWORD').required().value;
export const EMAIL_ADDITIONAL_CONFIG = config
    .get('EMAIL_ADDITIONAL_CONFIG')
    .json()
    .default({}).value;
//export const EMAIL_PORT = config.get('EMAIL_PORT').number().default(25 /*TODO: or 465, 587*/);
