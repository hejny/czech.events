import chalk from 'chalk';
import { readFile } from 'fs/promises';
import ical from 'ical';
import { join } from 'path';
import { IcalEventForParsing, parseIcalEventToEvent } from './utils/parseIcalEventToEvent';

main();

async function main() {
    console.clear();
    console.log(chalk.bgBlue(' 🔥 Parser '));
    const icsString = await readFile(join(__dirname, 'mocks/meetup.ics'), 'utf-8');
    const fullCalendar = ical.parseICS(icsString);

    const events = Object.values(fullCalendar)
        .filter(({ type }) => type === 'VEVENT')
        // .forEach((event) => console.log(JSON.stringify(event, null, 4)))
        .map((event) => parseIcalEventToEvent(event as IcalEventForParsing));

    console.info(events);
    console.info(chalk.bgGreen('[ Done ]'));
}

/**
 * TODO: !!!! Find sources again
 * TODO: !!!! Find Meetup sources
 * TODO: !!!! Sort important TODOs
 * TODO: !!!! Make picker
 * TODO: !!!! Save parsed to the database
 */
