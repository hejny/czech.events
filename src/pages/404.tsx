import Image from 'next/image';
import Head from 'next/head';
import { TalksPage } from '../components/TalksPage/TalksPage';
import { useMemo } from 'react';
import { ApiClient } from '../api/ApiClient';
import { HeadSection } from '../components/HeadSection/HeadSection';
import { Footer } from '../components/Footer/Footer';

export default function NotFoundPage() {
    return (
        <>
            <Head>
                <HeadSection subtitle="Nenalezeno" />
                {/* !!! Better and nicer */}
            </Head>
            <div className="page">404 {/* !!! Better and nicer */}</div>
            <Footer />
        </>
    );
}
