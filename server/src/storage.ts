import { config, S3 } from 'aws-sdk';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET_NAME,
} from './config';
import * as uuid from 'uuid';

config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

export const s3 = new S3();

testStorage();

async function testStorage() {
    const testSalt = uuid.v4();

    await s3
        .upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: '_test',
            ContentType: 'text/plain',
            Body: testSalt,
        })
        .promise();

    const { Body, ContentType } = await s3
        .getObject({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: '_test',
        })
        .promise();

    if ((Body as Buffer).toString() === testSalt) {
        console.log(`S3 Storage is working correctly!`);
    } else {
        console.log(`S3 Storage is probbably NOT working correctly!`);
    }

    await s3
        .deleteObject({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: '_test',
        })
        .promise();
}
