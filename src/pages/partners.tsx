import spaceTrim from 'spacetrim';
import { PageDiv } from '../components/PageDiv/PageDiv';
import startupWeekendPragueLogo from '../../public/design/logos/partners/startup-weekend-prague.png';
import startupWeekendBratislavaLogo from '../../public/design/logos/partners/startup-weekend-bratislava.png';
import undoutSleepBoxLogo from '../../public/design/logos/partners/undout.png';
import hackPragueLogo from '../../public/design/logos/partners/hackprague.svg';
import startupBoxLogo from '../../public/design/logos/partners/startupbox.png';
import collboardLogo from '../../public/design/logos/partners/collboard.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';
import { Partners } from 'src/components/Partners/Partners';
import { HeadSection } from 'src/components/HeadSection/HeadSection';

export default function PartnersPage() {
    return (
        <>
            <Head>
                <HeadSection subtitle="Gallery" />
            </Head>
            <div className="page">
                <Partners />
            </div>
        </>
    );
}

/**
 * TODO: [🥞] Link back to home
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
