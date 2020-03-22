import 'reflect-metadata';
import { createServer } from './createServer';
import { PORT } from './config';

main();

async function main() {
    const server = await createServer();

    server.listen(PORT, () => {
        console.info('██████████████████████████████████████████');
        console.info(`API is running at http://localhost:${PORT}`);
        // TODO: displayRoutes(app);
    });
}

/*
TODO: Is this worth it?
process.on('unhandledRejection', (err) => {
    console.error(err);
});
*/
