import path from 'path';
import { SSHClient } from './SSHClient.js';
import { uploadFilesToSsh } from './uploadFilesToSsh.js';
import * as packageInfo from '../../package.json';
const version = packageInfo.version;

export async function deployApi(remote) {
    const remoteDir = path
        .join(remote.baseVersionsDir, version)
        .split('\\')
        .join('/');

    /**/
    await uploadFilesToSsh(remote.credentials, path.join(__dirname, '..', '..'), remoteDir, [
        'src',
        'test',
        'pdfMaker.sh',
        'jest.config.js',
        'package.json',
        'package-lock.json',
        'tsconfig.json',
    ]);
    /**/

    /**/
    const client = await new SSHClient(remote.credentials, remoteDir).connect();
    /**/

    /**/

    await client.exec(`node --version`);
    /**/

    /**/
    await client.exec(`/bin/cp -R ${remote.configDir}/. ${remoteDir}`);
    await client.exec(`npm install --production`, false);

    await client.exec(`pm2 stop googleDocsToWordpress`, false);
    await client.exec(`npm test`);

    await client.exec(`pm2 delete googleDocsToWordpress`, false);
    await client.exec(`pm2 start googleDocsToWordpress.sh`);
    /**/

    /**/
    await client.exec(`pm2 save`);
    /**/

    /**/
    client.dispose();
    /**/
}
