import spaceTrim from 'spacetrim';
import styled from 'styled-components';
import { PageDiv } from '../components/PageDiv';
import startupWeekendPragueLogo from '../../public/design/logos/partners/startup-weekend-prague.png';
import startupWeekendBratislavaLogo from '../../public/design/logos/partners/startup-weekend-bratislava.png';
import undoutSleepBoxLogo from '../../public/design/logos/partners/undout.png';
import hackPragueLogo from '../../public/design/logos/partners/hackprague.svg';
import startupBoxLogo from '../../public/design/logos/partners/startupbox.png';
import collboardLogo from '../../public/design/logos/partners/collboard.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';
import { shuffleArray } from 'src/utils/shuffleArray';
import { Partners } from 'src/components/Partners';

export default function PartnersPage() {
    return (
        <RootLayout>
            <PageDiv>
                <Partners/>
            </PageDiv>
        </RootLayout>
    );
}


/**
 * TODO: Link back to home
 */
