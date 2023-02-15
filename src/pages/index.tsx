import spaceTrim from 'spacetrim';
import { PageDiv } from '../components/PageDiv/PageDiv';
import czechEventsBlackLogo from '../../public/design/logos/czech.events.black-logo.png';
import czechEventsWhiteLogo from '../../public/design/logos/czech.events.white-logo.png';
import czechEventsTransparentLogo from '../../public/design/logos/czech.events.transparent-logo.png';
import Image from 'next/image';
import Head from 'next/head';
import RootLayout from 'src/app/layout';
import { TalksPage } from 'src/components/TalksPage/TalksPage';
import { useMemo } from 'react';
import { ApiClient } from 'src/api/ApiClient';

export default function IndexPage() {
    /*
    TODO:
    TODO: Use Next methods to fetch data
    let apiUrl: string;


        if (window.location.hostname === 'localhost') {
            apiUrl = 'http://localhost:7755';
            // selfUrl = 'http://localhost:7754';
        } else {
            apiUrl = 'https://api.pavolhejny.com/czech-events';
            // selfUrl = 'https://czech.events';
        }
    }
    */

    const apiUrl = 'https://api.pavolhejny.com/czech-events';

    const apiClient = useMemo(() => new ApiClient(apiUrl), [apiUrl]);

    return (
        <RootLayout>
            <TalksPage {...{ apiClient }} />
        </RootLayout>
    );
}


/**
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */