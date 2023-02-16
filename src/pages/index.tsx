import Image from 'next/image';
import Head from 'next/head';
import { TalksPage } from '../components/TalksPage/TalksPage';
import { useMemo } from 'react';
import { ApiClient } from '../api/ApiClient';
import { HeadSection } from '../components/HeadSection/HeadSection';
import { Footer } from '../components/Footer/Footer';

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
        <>
            <Head>
                <HeadSection subtitle="Gallery" />
            </Head>
            <TalksPage {...{ apiClient }} />
            <Footer />
        </>
    );
}

/**
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
