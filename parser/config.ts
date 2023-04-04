import { ConfigChecker } from 'configchecker';
import dotenv from 'dotenv';
import path from 'path';
import { IFacebookCookies } from './utils/setFacebookCookies';
import { IMeetupCookies } from './utils/setMeetupCookies';

dotenv.config({ path: path.join(__dirname, '.env') });
const config = ConfigChecker.from(process.env);

export const FACEBOOK_COOKIES = config.get('FACEBOOK_COOKIES').json().asType<IFacebookCookies>().required().value;
export const MEETUP_COOKIES = config.get('MEETUP_COOKIES').json().asType<IMeetupCookies>().required().value;
