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
    await client.exec(
        `npm i` /* <- TODO: Here should be npm ci (clean install) but there is a problem with it:
                            > npm WARN prepare removing existing node_modules/ before installation
                            > npm ERR! cipm can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
                            > npm ERR!
                            > npm ERR!
                            > npm ERR! Invalid: lock file's @types/node@18.11.19 does not satisfy @types/node@18.11.9
                            > npm ERR!
        */,
        false,
    );

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
