import Image from 'next/image';
import Head from 'next/head';
import { TalksPage } from '../components/TalksPage/TalksPage';
import { useMemo } from 'react';
import { ApiClient } from '../api/ApiClient';
import { AppHead } from '../components/AppHead/AppHead';
import { Footer } from '../components/Footer/Footer';
import { useApiClient } from 'src/api/useApiClient';
import { TalksPageEmail } from 'src/components/TalksPageEmail/TalksPageEmail';
import { DateRange } from 'src/model/DateRange';
import { NewsletterComponent } from 'src/components/NewsletterComponent/NewsletterComponent';
import { createNewsletter } from 'src/utils/createNewsletter';
import { Event } from 'src/model/database/Event';
import { constructObjectFromJSON } from 'src/utils/constructObjectFromJSON';

export async function getStaticProps() {
    // Fetch data from external API
    const response = await fetch(`https://api.pavolhejny.com/czech-events/events`);
    const eventsData = await response.json();
    return { props: { eventsData } };
}

export default function IndexPage(props: { eventsData: Event[] }) {
    const { eventsData } = props;

    const events = eventsData.map((data: any) => constructObjectFromJSON(Event, data));

    // const apiClient = useApiClient();

    // !!! TO getServerSideProps
    const range = DateRange.fromConstant('CURRENT_MONTH-INFINITY');
    const newsletter = createNewsletter({
        events,
        range,
    });

    // console.log('!!!', { events, range, newsletter });

    return (
        <>
            <AppHead />
            <div className="letter white">
                <div className="inner">
                    <NewsletterComponent {...{ newsletter }} />
                </div>
            </div>
        </>
    );
}

/**
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
