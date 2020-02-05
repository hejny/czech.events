import { readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { getConvertedFile } from './getConvertedFile';

const preconvertFilename = path.join(__dirname, '../preconvert.txt');

preconvert();

async function preconvert() {
    const preconvertText = readFileSync(preconvertFilename).toString();

    const urls = preconvertText
        .split('\n')
        .map((url) => url.trim())
        .filter((url) => url !== '');

    if (urls.length === 0) {
        console.log(
            `"preconvert.txt" file is empty! You can now safely terminate the script.`,
        );
        setInterval(() => {
            //this is just a hack for keeping the script running
        }, 1000);
        return;
    }

    const [url] = urls.splice(0, 1);

    console.log(`[ ${urls.length} left ] Converting "${url}"`);
    try {
        await getConvertedFile(url);
    } catch (error) {
        console.log(`Error while converting "${url}".`);
    }

    const preconvertTextAppex = urls.join('\n');
    writeFileSync(preconvertFilename, preconvertTextAppex);

    preconvert(); //TODO: is this tail recursion memory optimal?
}
