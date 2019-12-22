import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from(process.env);

//Server
export const PORT = config.get('PORT', 'Server port').number().default(3000).value;
export const EVENTS_CSV_URL = config.get('EVENTS_CSV_URL').url().required().value;//TODO: use in all places that debugs something
