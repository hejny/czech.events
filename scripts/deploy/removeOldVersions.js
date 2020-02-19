import compareVersions from 'compare-versions';
import { SSHClient } from './SSHClient.js';

const SEMANTIC_VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$/;

export async function removeOldVersions(remote) {
    //console.info(remote);

    if (!remote.removeOldVersions) {
        console.info(`No configuration for deleting old versions.`);
        return;
    } else {
        console.info(`Deleting old versions - preserving last ${remote.removeOldVersions.preserveLast}.`);
    }

    const client = await new SSHClient(remote.credentials, remote.baseVersionsDir, false).connect();

    const versionsRaw = await client.list();

    // TODO: Maybe better in some functional way
    const versions = [],
        versionsIncorrect = [];
    for (const version of versionsRaw) {
        if (SEMANTIC_VERSION.test(version)) {
            versions.push(version);
        } else {
            versionsIncorrect.push(version);
        }
    }

    if (versionsIncorrect.length) {
        console.info(
            `There are some other files or folders along the correct semantic versions: ${versionsIncorrect.join(
                ', ',
            )}`,
        ); // TODO: Maybe warning
    }

    versions.sort(compareVersions).reverse();

    //console.log('versions', versions);

    const versionsDeleted = versions.splice(remote.removeOldVersions.preserveLast);

    console.info(`Theese version will be preserved: ${versions.join(', ')}`);

    await Promise.all(versionsDeleted.map((version) => client.exec(`rm -rf ${version}`)));

    if (versionsDeleted.length) {
        console.info(`Deleted versions: ${versionsDeleted.join(', ')}`);
    } else {
        console.info(`No deleted old version.`);
    }

    client.dispose();
}
