import chalk from 'chalk';
import { readFile } from 'fs/promises';
import ical from 'ical';
import { join } from 'path';

main();

async function main() {
    console.clear();
    console.log(chalk.bgBlue(' 🔥 Parser '));
    const icsString = await readFile(join(__dirname, 'mocks/meetup.ics'), 'utf-8');

    const ics = ical.parseICS(icsString);

    console.log(ics);

    console.info(chalk.bgGreen('[ Done ]'));
}
