import { getApiUrl } from 'src/api/getApiUrl';
import { useApiClient } from 'src/api/useApiClient';
import { Event } from 'src/model/database/Event';
import { constructObjectFromJSON } from 'src/utils/constructObjectFromJSON';
import { AppHead } from '../components/AppHead/AppHead';
import { Footer } from '../components/Footer/Footer';
import { TalksPage } from '../components/TalksPage/TalksPage';

export async function getStaticProps() {
    const response = await fetch(`${getApiUrl().href}/events`);
    const eventsData = await response.json();
    return { props: { eventsData } };
}

export default function IndexPage(props: { eventsData: Event[] }) {
    const { eventsData } = props;
    const prerenderedEvents = eventsData.map((data: any) => constructObjectFromJSON(Event, data));

    const apiClient = useApiClient();

    return (
        <>
            <AppHead />
            <TalksPage {...{ apiClient, prerenderedEvents }} />
            <Footer />
        </>
    );
}

/**
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
