import Image from 'next/image';
import Head from 'next/head';
import { TalksPage } from '../components/TalksPage/TalksPage';
import { useMemo } from 'react';
import { ApiClient } from '../api/ApiClient';
import { AppHead } from '../components/AppHead/AppHead';
import { Footer } from '../components/Footer/Footer';

export default function NotFoundPage() {
    return (
        <>
            <AppHead subtitle="Nenalezeno" />
            <div className="page">404 {/* !!! Better and nicer */}</div>
            <Footer />
        </>
    );
}