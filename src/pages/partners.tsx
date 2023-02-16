import Head from 'next/head';
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
