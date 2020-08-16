// TODO: Make library from it - maybe with loader.
/*
"compare-versions": "^3.5.1",
"glob-promise": "^3.4.0",
"node-ssh": "^6.0.0",
"open-cli": "^5.0.0",
"promise-sftp": "^0.11.3",
"glob": "^7.1.6",
*/
import * as packageInfo from '../../package.json';
import { deployApi } from './deployApi';
import { removeOldVersions } from './removeOldVersions';
import { deployedVersionCheck } from './deployedVersionCheck';
const version = packageInfo.version;

export async function deploy(deployConfig) {
    try {
        console.info(`====================[ Deploying version ${version} ]==>`);
        for (const remote of deployConfig) {
            console.info(`=======[ "${remote.name}"]==>`);
            await deployApi(remote);
            await deployedVersionCheck(remote);
            await removeOldVersions(remote);
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    process.exit(0);
}
