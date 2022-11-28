import chalk from 'chalk';
import ical from 'ical';
import { forPlay } from '../scraper/forPlay';
import { connectionPromise } from '../server/database';
import { Event } from '../src/model/database/Event';
import { EventSource } from '../src/model/database/EventSource';
import { fetchIcal } from './utils/fetchIcal';
import { IcalEventForParsing, parseIcalEventToEvent } from './utils/parseIcalEventToEvent';

main();

async function main() {
    console.clear();
    console.log(chalk.bgBlue(' 🔥 Parser '));

    const connection = await connectionPromise;

    const eventSources = await connection.manager.find(EventSource, {
        order: { id: /* !!! 'ASC'*/ 'DESC' },
    });

    const events = [];

    for (let { url } of eventSources) {
        await forPlay();

        try {
            if (url.match(/meetup\.com/)) {
                url = url.replace(/(\/events)?\/?$/, '/events/ical');
            } else if (url.match(/facebook\.com/) && !url.match(/facebook\.com\/events\/ical/)) {
                continue;
            } else if (url.match(/eventbrite\.com/)) {
                // TODO: Parse events from eventbrite.com
                //       @see https://github.com/diafygi/eb-to-ical
                continue;
            } else if (url.match(/czechstartups\.org/)) {
                // TODO: Parse events from czechstartups.org
                //       @see https://wp-event-organiser.com/
                //       @see https://www.czechstartups.org/wp-admin/admin-ajax.php?action=eventorganiser-fullcal&start=2022-10-31&end=2022-12-05&timeformat=G%3Ai
                continue;
            }

            const icalString = await fetchIcal(url);
            // const icalString = await readFile(join(__dirname, 'mocks/meetup.ics'), 'utf-8');

            // console.log({ icsString });

            const fullCalendar = ical.parseICS(icalString);

            const eventsFromSource = Object.values(fullCalendar)
                .filter(({ type }) => type === 'VEVENT')
                // .forEach((event) => console.log(JSON.stringify(event, null, 4)))
                .map((event) => parseIcalEventToEvent(event as IcalEventForParsing));

            events.push(...eventsFromSource);

            console.info(chalk.cyan(`Parsed ${eventsFromSource.length} events from ${url}`));

            /*
        if (eventsFromSource.length === 0 && icsString.length > 15) {
            console.warn(chalk.yellow(`BUT downloaded calendar does not look empty:`));
            console.info(icsString);
        }
        */
        } catch (error) {
            console.error(chalk.red(error));
        }
    }

    console.log(chalk.bgBlue(' 🔥 Importer '));

    for (const newEvent of events) {
        if (newEvent.serializeId.length < 3) {
            // !!! Do this checking in external util
            console.info(chalk.red(`${newEvent.name} has strange serializeId "${newEvent.serializeId}"`));
            continue;
        }

        const oldEvent = await connection.manager.findOne(Event, {
            where: { serializeId: newEvent.serializeId },
        });

        // !!! Updating
        // !!! Better comparison by name (and maybe topic)

        if (oldEvent) {
            console.info(chalk.gray(`${newEvent.name} already exists in database as ${oldEvent.id}`));
        } else {
            const result = await connection.manager.insert(Event, newEvent);
            console.info(chalk.green(`${newEvent.name} added to database as ${result.identifiers[0].id}`));
        }
    }

    // console.info(events);
    console.info(chalk.bgGreen('[ Done ]'));
    process.exit(0);
}

/**
 * TODO: !!!! Find sources again
 * TODO: !!!! Find Meetup sources
 * TODO: !!!! Sort important TODOs
 * TODO: !!!! Make picker
 * TODO: !!!! Save parsed to the database
 */
