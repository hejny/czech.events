import chalk from 'chalk';
import { locateChrome } from 'locate-app';
import { join } from 'path';
import puppeteer from 'puppeteer-core';
import { spaceTrim } from 'spacetrim';
import { forTime } from 'waitasecond';
import { FACEBOOK_COOKIES } from './config';
import { forPlay } from './forPlay';
import { setFacebookCookies } from './setFacebookCookies';

const FACEBOOK_GROUPS = [
    //'https://m.facebook.com/groups/4547992308640003',

    'https://m.facebook.com/groups/236797913757886/',
    'https://m.facebook.com/groups/1630097043923905/',
    'https://m.facebook.com/groups/684672464913744/',
    'https://m.facebook.com/groups/startupisti/',
    'https://m.facebook.com/groups/917615511634078/',
    'https://m.facebook.com/groups/CzechStartupGroup/',
    'https://m.facebook.com/groups/frontendisti/',
    'https://m.facebook.com/groups/pragueentrepreneurs/',
    'https://m.facebook.com/groups/2008239912597783/',
    'https://m.facebook.com/groups/151639034871127/',
    'https://m.facebook.com/groups/python/',
    'https://m.facebook.com/groups/908239562562828/',
    'https://m.facebook.com/groups/1965411213710679/',
    'https://m.facebook.com/groups/1866593896936032/',
    'https://m.facebook.com/groups/pehapkari/',
    'https://m.facebook.com/groups/1166463656716461/',
    'https://m.facebook.com/groups/1038576426260969/',
    'https://m.facebook.com/groups/1029128630452702/',
    'https://m.facebook.com/groups/AnonymniAnalytici/',
    'https://m.facebook.com/groups/webdevjs/',
    'https://m.facebook.com/groups/837053033481607/',
    'https://m.facebook.com/groups/733819089984469/',
    'https://m.facebook.com/groups/625328368519977/',
    'https://m.facebook.com/groups/StartUpHK/',
    'https://m.facebook.com/groups/314557545818551/',
    'https://m.facebook.com/groups/298695726816696/',
    'https://m.facebook.com/groups/250594755872553/',
    'https://m.facebook.com/groups/217530805318863/',
    'https://m.facebook.com/groups/PyWorkingPraha/',
    'https://m.facebook.com/groups/167318856805742/',
    'https://m.facebook.com/groups/hackpragueparticipants/',
    'https://m.facebook.com/groups/2380761312209760/',
    'https://m.facebook.com/groups/2368176933403815/',
    'https://m.facebook.com/groups/2317434164943200/',
    'https://m.facebook.com/groups/react0/',
    'https://m.facebook.com/groups/2095153874099421/',
    'https://m.facebook.com/groups/1989815967951521/',
    'https://m.facebook.com/groups/HTML5.JavaScript.CSS3.Learn/',
    'https://m.facebook.com/groups/1806114342948040/',
    'https://m.facebook.com/groups/programming.jokes/',
    'https://m.facebook.com/groups/datajobs/',
    'https://m.facebook.com/groups/1787143371592582/',
    'https://m.facebook.com/groups/czskwin/',
    'https://m.facebook.com/groups/backendisti/',
    'https://m.facebook.com/groups/pehapkari.prace/',
    'https://m.facebook.com/groups/programmershub1/',
    'https://m.facebook.com/groups/hackathony.cz/',
    'https://m.facebook.com/groups/Virtualnirealita/',
    'https://m.facebook.com/groups/1647922292197959/',
    'https://m.facebook.com/groups/NodeJsDevelopersGroup/',
    'https://m.facebook.com/groups/programovaniwebu/',
    'https://m.facebook.com/groups/1592470094107467/',
    'https://m.facebook.com/groups/praguebn/',
    'https://m.facebook.com/groups/programovanie/',
    'https://m.facebook.com/groups/typescript.developers/',
    'https://m.facebook.com/groups/alljavascript/',
    'https://m.facebook.com/groups/pmdvlinworld/',
    'https://m.facebook.com/groups/1499060723543914/',
    'https://m.facebook.com/groups/1493727000916386/',
    'https://m.facebook.com/groups/linuxprozacatecniky/',
    'https://m.facebook.com/groups/1445551435644467/',
    'https://m.facebook.com/groups/GraficiCZaSK/',
    'https://m.facebook.com/groups/wwebdeveloper/',
    'https://m.facebook.com/groups/frontendistiprace/',
    'https://m.facebook.com/groups/printitgroup/',
    'https://m.facebook.com/groups/Kubernetes.QandA/',
    'https://m.facebook.com/groups/1143281042351453/',
    'https://m.facebook.com/groups/jobsprojects/',
    'https://m.facebook.com/groups/ReactJsDevelopersGroup/',
    'https://m.facebook.com/groups/PragueBusinessNetwork/',
    'https://m.facebook.com/groups/1022989581403258/',
    'https://m.facebook.com/groups/961261094053875/',
    'https://m.facebook.com/groups/944676645990018/',
    'https://m.facebook.com/groups/943086679527236/',
    'https://m.facebook.com/groups/886334061430216/',
    'https://m.facebook.com/groups/pythoncodingprogrammingselfinstructionhub',
    'https://m.facebook.com/groups/devopsdocker/',
    'https://m.facebook.com/groups/846239255751398/',
    'https://m.facebook.com/groups/830017300349727/',
    'https://m.facebook.com/groups/820629734656858/',
    'https://m.facebook.com/groups/NodeJSLive/',
    'https://m.facebook.com/groups/UXJobsCZ/',
    'https://m.facebook.com/groups/711547983063351/',
    'https://m.facebook.com/groups/flutterdevunited/',
    'https://m.facebook.com/groups/584735258380468/',
    'https://m.facebook.com/groups/578594392845695/',
    'https://m.facebook.com/groups/nodeschool/',
    'https://m.facebook.com/groups/571845800263396/',
    'https://m.facebook.com/groups/543088043103289/',
    'https://m.facebook.com/groups/529080837486408/',
    'https://m.facebook.com/groups/517689422131634/',
    'https://m.facebook.com/groups/programming.haskell/',
    'https://m.facebook.com/groups/484603645078607/',
    'https://m.facebook.com/groups/483671621698102/',
    'https://m.facebook.com/groups/482391751925633/',
    'https://m.facebook.com/groups/469950746429675/',
    'https://m.facebook.com/groups/programujITJOBS/',
    'https://m.facebook.com/groups/pracevit/',
    'https://m.facebook.com/groups/462908340934394/',
];

function makePost() {
    const tags = new Set([
        'RussianWarInUkraine',
        'WeAreAllUkrainians',
        'StopTheWar',
        'United',
        'StandTogether',
        'Ukraine',
        'StandWithUkraine',
        'standwithukraine',
        'stojimezaukrajinou',
        'putinstop',
        'stopwar',
        'unitedworld',
    ]);

    return spaceTrim(`

      🇺🇦Hi🎗️,
      Many of you maintain various web services.

      add ribbon with Ukraine flag into the website you manage, show the anti-war message to Russian users, or block them from your service.

      A lot of companies did this in their custom way but this library is a super easy option to do for everyone:

      🟦🟨🟦🟨🟦🟨

      🇺🇦Ahoj🎗️,
      mnoho z vás provozujete různé webové služby.
      Přidejte si na své stránky do rohu Ukrajinskou vlajku případně se připojte k vlastní mini-blokádě.

      Udělal jsem k tomu mikro knihovnu:

      🟦🟨🟦🟨🟦🟨

      https://github.com/hejny/Ukraine

      ${shuffleArray(Array.from(tags))
          .map((tag) => `#${tag}`)
          .join(' ')}

  `);
}

function shuffleArray<T>(array: T[]): T[] {
    array = [...array];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

main(false);

async function main(isTesting: boolean) {
    console.clear();
    console.log(chalk.bgBlue(' 🖊️ Writer '));

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: await locateChrome(),
        defaultViewport: null,
        args: [
            //'--proxy-server=socks5://127.0.0.1:9050',
            `--disable-extensions-except=${join(__dirname, '../button-webextension')}`,
            `--load-extension=${join(__dirname, '../button-webextension')}`,
            '--enable-automation',

            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
        ],
    });

    browser.on('disconnected', () => {
        console.log('browser disconnected');
        process.exit(1);
    });
    for (const groupUrl of FACEBOOK_GROUPS) {
        await forPlay();
        let groupPage: puppeteer.Page;

        try {
            console.info(chalk.bgGray(groupUrl));

            groupPage = await browser.newPage();
            await setFacebookCookies(groupPage, FACEBOOK_COOKIES);

            await groupPage.goto(
                groupUrl,

                { waitUntil: 'networkidle2' },
            );

            /*
            await forTime(5000);

            const cookiesButton = (await groupPage.$x(
                `//button[contains(., 'Allow essential and optional cookies')]`,
            ))[0];
            if (cookiesButton) {
                await cookiesButton.click();
            }
            */

            if (!isTesting) {
                await forTime(1000 * 60 * Math.random());
            }

            await (await groupPage.$x(`//div[contains(text(), 'Write something...')]`))[0].click();

            // `//div[contains(text(), "What's on your mind?")]/textarea`
            await groupPage.type('textarea', makePost(), isTesting ? { delay: 0 } : { delay: 200 * Math.random() });

            await forTime(1000);

            //await groupPage.click(`div[data-sigil='bottom_submit_composer']`);
            //await (await groupPage.$x(`//button[contains(text(), 'Post')]`))[0].click();

            const postButtons = await groupPage.$$(`div[data-sigil='bottom_submit_composer']`);
            for (const postButton of postButtons) {
                try {
                    postButton.click();
                } catch (e) {}
            }

            await forTime(5000);

            console.info(chalk.green('[✓] ' + groupUrl));
        } catch (error) {
            console.info(chalk.red('[×] ' + groupUrl));
            console.error(error);
            console.info(chalk.gray('Waiting one minute and then continue...'));

            await forTime(1000 * 60);
        } finally {
            await groupPage.close();
        }
    }

    console.info(chalk.bgGreen('[ Done ]'));
}
