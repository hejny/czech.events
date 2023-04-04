import chalk from 'chalk';
import ical from 'ical';
import { forPlay } from './utils/forPlay';
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
        order: { id: 'DESC' },
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

            // TODO: !!!Also fetch ld+json AND add to sources https://www.paralelnipolis.cz/program

            const icalString = await fetchIcal(url);
            // const icalString = await readFile(join(__dirname, 'mocks/meetup.ics'), 'utf-8');

            // console.log({ icsString });

            const fullCalendar = ical.parseICS(icalString);

            let parsedCount = 0;
            let parsedErrorCount = 0;
            for (const icalEvent of Object.values(fullCalendar).filter(({ type }) => type === 'VEVENT')) {
                try {
                    const event = parseIcalEventToEvent(icalEvent as IcalEventForParsing);
                    events.push(event);
                    parsedCount++;
                } catch (error) {
                    if (!(error instanceof Error)) {
                        throw error;
                    }
                    parsedErrorCount++;
                    console.error(error);
                }
            }

            console.info(chalk.cyan(`Parsed ${parsedCount} events from ${url}`));
            if (parsedErrorCount) {
                console.info(chalk.red(`NOT Parsed ${parsedErrorCount} events from ${url}`));
            }
            /*
        if (eventsFromSource.length === 0 && icsString.length > 15) {
            console.warn(chalk.yellow(`BUT downloaded calendar does not look empty:`));
            console.info(icsString);
        }
        */
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.info(chalk.red(`NOT Parsed events from ${url}`));
            console.error(chalk.red(error));
        }
    }

    console.log(chalk.bgBlue(' 🔥 Importer '));

    for (const newEvent of events) {
        const oldEvent = await connection.manager.findOne(Event, {
            where: { serializeId: newEvent.serializeId },
        });

        if (oldEvent) {
            const updateData = { ...newEvent };
            // TODO: Should be name,topic and type updated?
            // delete updateData.name;
            // delete updateData.topic;
            // delete updateData.type;
            delete updateData.visibility;

            const updateResult = await connection
                .createQueryBuilder()
                .update(Event)
                .set(updateData)
                .where({
                    serializeId: newEvent.serializeId,
                })
                .limit(1)
                .execute();

            if (updateResult.raw.changedRows !== 0) {
                console.info(chalk.bgBlue(`[ Updated ]`) + ' ' + chalk.blue(newEvent.name));
            } else {
                console.info('            ' + chalk.gray(newEvent.name));
            }
        } else {
            await connection.manager.insert(Event, newEvent);
            console.info('  ' + chalk.bgGreen(`[ Added ]`) + ' ' + chalk.green(newEvent.name));
        }
    }

    // console.info(events);
    console.info(chalk.bgGreen('[ Done ]'));
    process.exit(0);
}

/**
 * !!! Rename parser to ?scraper, ?downloadAndParse, -> feeder <-
 */
