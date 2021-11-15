import { ConfigChecker } from 'configchecker';
import dotenv from 'dotenv';
import path from 'path';
import { IFacebookCookies } from './setFacebookCookies';

dotenv.config({ path: path.join(__dirname, '.env') });
const config = ConfigChecker.from(process.env);

export const FACEBOOK_COOKIES = config.get('FACEBOOK_COOKIES').json().asType<IFacebookCookies>().required().value;
