import 'reflect-metadata';

import { createApp } from './app';
import { PORT } from './config';
import { UpdateEventsDeamon } from './deamons/UpdateEventsDeamon';

main();

async function main() {
    /**/
    const { app } = await createApp();

    app.listen(PORT, () => {
        console.info('██████████████████████████████████████████');
        console.info(`API is running at http://localhost:${PORT}`);
        // TODO: displayRoutes(app);
    });
    /**/

    const updateEventsDeamon = new UpdateEventsDeamon();
    //console.info(`UpdateEventsDeamon is running`);
    //updateEventsDeamon.quick();
    updateEventsDeamon.run();

    /*/
    // Note: Keep this for scraper testing
    const url = `https://www.facebook.com/events/343796723412434`;

    const jsonld = await extractJsonldFromUrl(url);
    console.log(`jsonld`, jsonld);
    const eventData = await parseJsonldToEvent(jsonld, url);
    console.log(`eventData`, eventData);
    /**/
}

// TODO: Auto imports organize

/*
TODO: Is this worth it?
process.on('unhandledRejection', (err) => {
    console.error(err);
});
*/
