import { ConfigChecker } from 'configchecker';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });
const config = ConfigChecker.from(process.env);

export const PORT = config
    .get('PORT')
    .number()
    .default(9977).value!;

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

// TODO: Do not run mailService and newsletterService on local PC

//Email SMTP config
export const EMAIL_HOST = config.get('EMAIL_HOST', 'Smtp server').required().value;
export const EMAIL_USER = config.get('EMAIL_USER').required().value;
export const EMAIL_PASSWORD = config.get('EMAIL_PASSWORD').required().value;
export const EMAIL_ADDITIONAL_CONFIG = config
    .get('EMAIL_ADDITIONAL_CONFIG')
    .json()
    .default({}).value;
// TODO: remove or use export const EMAIL_PORT = config.get('EMAIL_PORT').number().default(25 /*TODO: or 465, 587*/);

export const EMAIL_LIMIT_SEND_FREQUENCY = config
    .get('EMAIL_LIMIT_SEND_FREQUENCY')
    .number()
    .default(60).value!;
export const EMAIL_LIMIT_IN_ONE_TICK = config
    .get('EMAIL_LIMIT_IN_ONE_TICK')
    .number()
    .default(2).value!;
export const EMAIL_LIMIT_RETRY_AFTER = config
    .get('EMAIL_LIMIT_RETRY_AFTER')
    .number()
    .default(3600).value!;
export const EMAIL_LIMIT_LIVETIME = config
    .get('EMAIL_LIMIT_LIVETIME')
    .number()
    .default(60 * 60 * 24 * 3).value!;
export const EMAIL_LIMIT_RETRIES = config
    .get('EMAIL_LIMIT_RETRIES')
    .number()
    .default(3).value!;
