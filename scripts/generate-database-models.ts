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
        await execAsyncFull(
            `npx typeorm-model-generator -h ${DB_HOST} -d ${DB_NAME} -u ${DB_USER} -x "${DB_PASSWORD}" -e mysql -o ${baseFolder}`,
        );

        console.info('Database models successfully created, please purge them before commit by:');
        console.warn('\x1b[43m', '\x1b[37m', `rm -rf ${baseFolder}`, '\x1b[0m');

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
