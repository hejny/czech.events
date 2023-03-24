import { NewsletterComponent } from 'src/components/NewsletterComponent/NewsletterComponent';
import { Event } from 'src/model/database/Event';
import { DateRange } from 'src/model/DateRange';
import { constructObjectFromJSON } from 'src/utils/constructObjectFromJSON';
import { createNewsletter } from 'src/utils/createNewsletter';
import { AppHead } from '../components/AppHead/AppHead';

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
