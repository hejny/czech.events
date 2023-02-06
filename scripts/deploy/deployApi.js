import path from 'path';
import * as packageInfo from '../../package.json';
import { SSHClient } from './SSHClient';
import { uploadFilesToSsh } from './uploadFilesToSsh';
const version = packageInfo.version;

export async function deployApi(remote) {
    const remoteDir = path.join(remote.baseVersionsDir, version).split('\\').join('/');

    /**/
    await uploadFilesToSsh(remote.credentials, path.join(__dirname, '..', '..'), remoteDir, [
        'server',
        'parser',
        'src',
        'ecosystem.config.js',
        'package.json',
        'package-lock.json',
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
    await client.exec(`npm ci`, false);

    await client.exec(`pm2 stop czech-events`, false);
    // TODO: !!> await client.exec(`npm test`);

    await client.exec(`pm2 delete czech-events`, false);
    await client.exec(`pm2 start ecosystem.config.js`);
    /**/

    /**/
    await client.exec(`pm2 save`);
    /**/

    /**/
    client.dispose();
    /**/
}
