import { s3 } from './storage';
import * as path from 'path';
import { execute } from './utils/execute';
import { createHash } from 'crypto';
import { parse } from 'url';
import { readFileSync, unlinkSync } from 'fs';
import { CACHE_DIR, AWS_S3_BUCKET_NAME } from './config';
const slimerJS = require('slimerjs');
const PDF_SLIMER_SCRIPT = path.join(__dirname, 'slimerPDF.js');

export async function getConvertedFile(
    url: string,
    nocache = false,
    renderOnCallback = false,
): Promise<Buffer> {
    const pdfKey = parse(url).hostname + '/' + url.split('/').join('-');
    const hash = createHash('sha256')
        .update(url)
        .digest('hex');
    const pdfCachePath = path.join(__dirname, '..', CACHE_DIR!, `${hash}.pdf`);

    return (nocache ? Promise.reject() : retrievePDFFromCache(pdfKey))
        .catch(() => generatePDF(url, pdfCachePath, renderOnCallback))
        .then((file) =>
            nocache
                ? Promise.resolve(file)
                : cacheFile(pdfKey, file, 'application/pdf'),
        );
}

async function generatePDF(
    url: string,
    filePath: string,
    renderOnCallback = false,
): Promise<Buffer> {
    try {
        const output = await execute(slimerJS.path, [
            '--headless',
            '--disk-cache=true',
            PDF_SLIMER_SCRIPT,
            renderOnCallback ? '--render-on-callback' : '',
            `"${url}"`,
            filePath,
        ]);
        console.debug('SlimerJS', output);
        return readFileSync(filePath);
    } catch (error) {
        console.error(error);
        throw new Error(`URL '${url}' not found`);
    }
}

async function retrievePDFFromCache(key: string): Promise<Buffer> {
    const { Body } = await s3
        .getObject({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: key,
        })
        .promise();
    console.debug('From cache', key);
    return Body as Buffer;
}

async function cacheFile(key: string, file: Buffer, contentType?: string) {
    await s3
        .upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: key,
            ContentType: contentType,
            Body: file,
        })
        .promise();
    return file;
}
