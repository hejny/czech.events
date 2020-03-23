import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../server/config';

const execAsync = promisify(exec);

main();

async function main() {
    try {
        const baseFolder = normalizePath(join(__dirname, '../src/model/database-generated'));
        try {
            await execAsyncFull(`git diff --exit-code`);
        } catch (error) {
            throw new Error(`You should commit changes first before generating new database models.`);
        }

        try {
            await execAsyncFull(
                `npx typeorm-model-generator -h ${DB_HOST} -d ${DB_NAME} -u ${DB_USER} -x "${DB_PASSWORD}" -e mysql -o ${baseFolder}`,
            );
        } catch (error) {
            if (error.message.includes('operation not permitted, unlink')) {
                // TODO: weird error on Windows
                /*
                Error: EPERM: operation not permitted, unlink 'C:\Users\me\AppData\Roaming\npm-cache\_npx\11612\node_modules\typeorm-model-generator\node_modules\sqlite3\lib\binding\node-v72-win32-x64\node_sqlite3.node'        
                    at Object.unlinkSync (fs.js:976:3)
                    at fixWinEPERMSync (C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:211:13)
                    at rimrafSync (C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:311:28)
                    at C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:342:5
                    at Array.forEach (<anonymous>)
                    at rmkidsSync (C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:341:26)
                    at rmdirSync (C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:334:7)
                    at fixWinEPERMSync (C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:209:5)
                    at rimrafSync (C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:311:28)
                    at C:\Program Files\nodejs\node_modules\npm\node_modules\rimraf\rimraf.js:342:5 {
                errno: -4048,
                syscall: 'unlink',
                code: 'EPERM',
                path: 'C:\\Users\\me\\AppData\\Roaming\\npm-cache\\_npx\\11612\\node_modules\\typeorm-model-generator\\node_modules\\sqlite3\\lib\\binding\\node-v72-win32-x64\\node_sqlite3.node'
                */
            } else {
                throw error;
            }
        }

        console.info('Database models successfully created, please purge them before commit by:');
        console.warn('\x1b[43m', '\x1b[30m', `rm -rf ${baseFolder}`, '\x1b[0m');
        console.warn(
            'Do not forget to add the newly generated Entities to server/database.ts and src/model/database/_emitDecoratorMetadata.ts!',
        );

        // TODO: Automatically push to specific branch and create merge to current branch
        //await execAsyncFull(`cp ${baseFolder}/entities`);
    } catch (error) {
        console.error('\x1b[41m', '\x1b[37m', error.message, '\x1b[0m');
    }
}

export async function execAsyncFull(command: string, crashOnError = true) {
    console.info('\x1b[36m%s\x1b[0m', command, '\x1b[0m');

    const { stdout, stderr } = await execAsync(command);

    console.info(stdout);

    if (stderr) {
        if (crashOnError) {
            throw new Error(stderr);
        } else {
            console.warn(stderr);
        }
    }
}

function normalizePath(path: string): string {
    return path.split('\\').join('/');
}
