import chalk from 'chalk';
import { readFile } from 'fs/promises';
import ical from 'ical';
import { join } from 'path';

main();

async function main() {
    console.clear();
    console.log(chalk.bgBlue(' 🔥 Parser '));
    const icsString = await readFile(join(__dirname, 'mocks/meetup.ics'), 'utf-8');
    const fullCalendar = ical.parseICS(icsString);

    Object.values(fullCalendar)
        .filter(({ type }) => type === 'VEVENT')
        .forEach((event) => console.log(JSON.stringify(event, null, 4)));
    //.map(parseIcalToEvent);

    console.log(Object.values(fullCalendar)[0]);

    console.info(chalk.bgGreen('[ Done ]'));
}

/**
 * TODO: !!!! Find sources again
 * TODO: !!!! Find Meetup sources
 * TODO: !!!! Sort important TODOs
 * TODO: !!!! Make picker
 * TODO: !!!! Save parsed to the database
 */
