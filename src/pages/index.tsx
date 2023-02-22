import Image from 'next/image';
import Head from 'next/head';
import { TalksPage } from '../components/TalksPage/TalksPage';
import { useMemo } from 'react';
import { ApiClient } from '../api/ApiClient';
import { AppHead } from '../components/AppHead/AppHead';
import { Footer } from '../components/Footer/Footer';
import { useApiClient } from 'src/api/useApiClient';

export default function IndexPage() {

  const apiClient = useApiClient();

    return (
        <>
            <AppHead />
            <TalksPage {...{ apiClient }} />
            <Footer />
        </>
    );
}

/**
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
