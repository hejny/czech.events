import fs from 'fs';
import glob from 'glob-promise';
import path from 'path';
import PromiseSftp from 'promise-sftp';
import { sshMkdirRecursive } from './sshMkdirRecursive';

export async function uploadFilesToSsh(sshCredentials, localDir, remoteDir, onlyFiles = null) {
    //console.info(path.join(localDir,onlyFiles[0]));
    const client = new PromiseSftp();
    await client.connect(sshCredentials);

    const localFiles = (await glob(localDir + `/{,!(node_modules)/**/}*`))
        .filter((file) => fs.statSync(file).isFile())
        .map((file) => {
            //console.info('file',file)
            return file;
        })
        .filter((file) => {
            if (onlyFiles) {
                return onlyFiles.some((onlyFile) => path.join(file).includes(path.join(localDir, onlyFile)));
            } else {
                return true;
            }
        })
        .map((file) => path.normalize(file));

    const files = localFiles.map((localFile) => {
        const remoteFile = localFile.split('\\').join('/').replace(localDir, remoteDir).split('\\').join('/');

        return {
            localFile,
            remoteFile,
        };
    });

    const remoteDirs = files.map(({ remoteFile }) => path.dirname(remoteFile)).filter((v, i, a) => a.indexOf(v) === i);

    console.info(`Creating directory structure.`);
    const listsCache = {};
    for (const remoteDir of remoteDirs) {
        await sshMkdirRecursive(client, remoteDir, listsCache);
    }
    console.info(`Directory structure created.`);
    console.info(`Uploading files.`);

    await Promise.all(
        files.map(async ({ localFile, remoteFile }) => {
            console.info(`Uploading file "${remoteFile}"...`);
            //console.info('localFile', localFile);
            //console.info('remoteFile', remoteFile);
            //console.info('-----');

            await client.fastPut(localFile, remoteFile);
            console.info(`Uploaded file "${remoteFile}".`);
        }),
    );

    /*
    for (const localFile of ) {
        const remoteFile = localFile
            .replace(localDir, remoteDir)
            .split('\\')
            .join('/');


        console.info(`Uploading file "${remoteFile}"...`);
        //console.info('localFile', localFile);
        //console.info('remoteFile', remoteFile);
        //console.info('-----');

        await sshMkdirRecursive(client, path.dirname(remoteFile));
        //await client.fastPut(localFile, remoteFile);
    }
    */

    await client.end();
    console.info(`Uploading finished!`);
}
