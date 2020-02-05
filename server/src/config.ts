import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from(process.env);

export const PORT = config
    .get('PORT')
    .number()
    .default(3000).value!;
export const SLIMERJSLAUNCHER = config.get('SLIMERJSLAUNCHER').required().value;
export const CACHE_DIR = config.get('CACHE_DIR').value;
export const AWS_S3_BUCKET_NAME = config
    .get('AWS_S3_BUCKET_NAME')
    .default('untitled').value!;
export const AWS_ACCESS_KEY_ID = config.get('AWS_ACCESS_KEY_ID').value;
export const AWS_REGION = config.get('AWS_REGION').value;
export const ERROR_WRONG_URL = config.get('ERROR_WRONG_URL').url().value;
