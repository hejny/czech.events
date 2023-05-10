import { AppHead } from '../components/AppHead/AppHead';
import { Partners } from '../components/Partners/Partners';

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
