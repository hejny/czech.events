import Head from 'next/head';
import { Partners } from '../components/Partners/Partners';
import { AppHead } from '../components/AppHead/AppHead';

export default function PartnersPage() {
    return (
        <>
            <AppHead subtitle="Partneři" />
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
