import Head from 'next/head';
import { Partners } from '../components/Partners/Partners';
import { AppHead } from '../components/AppHead/AppHead';
import { constructObjectFromJSON } from 'src/utils/constructObjectFromJSON';
import { Event } from 'src/model/database/Event';
import { ProposeForm } from 'src/components/ProposeForm/ProposeForm';
import { useApiClient } from 'src/api/useApiClient';
import czechEventsTransparentLogoFit from '../../public/design/logos/czech.events.transparent-logo.fit.png';
import Image from 'next/image';

export default function PartnersPage() {
    const apiClient = useApiClient();

    return (
        <>
            <AppHead subtitle="Partneři" />
            <div className="page">
                <Image
                    src={czechEventsTransparentLogoFit}
                    alt="Czech.events logo"
                    width={200}
                    style={{ marginTop: 50 }}
                />
                <ProposeForm apiClient={apiClient} />
            </div>
        </>
    );
}

/**
 * TODO: DRY Image header component
 * TODO: [🥞] Link back to home
 * TODO: [🥞] Common skeleton - logo + footer for all pages
 */
