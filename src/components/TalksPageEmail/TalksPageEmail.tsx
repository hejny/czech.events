import Link from 'next/link';
import { Event } from '../../model/database/Event';
import { NewsletterContentPosition } from '../../model/database/NewsletterContent';
import { DateRange } from '../../model/DateRange';
import { createNewsletter } from '../../utils/createNewsletter';
import { NewsletterComponent } from '../NewsletterComponent/NewsletterComponent';
import { NewsletterContentsComponent } from '../NewsletterComponent/NewsletterContentsComponent/NewsletterContentsComponent';
import { Shuffle } from '../Shuffle/Shuffle';

// TODO: Remove @deprecated import { Newsletter } from '../model/database/Newsletter';

interface ITalksPageEmailProps {
    range: DateRange;
    events: Event[];
    // TODO: Remove @deprecated newsletter: null | Newsletter;
}

export function TalksPageEmail(props: ITalksPageEmailProps) {
    const newsletter = createNewsletter(props);
    const { newsletterContents } = newsletter;

    return (
        <>
            <h2>
                {/*`📅 Konference / meetupy / hackathony – co se děje z IT / Startupové akce 🌆`*/}
                <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.SUBJECT }} />
            </h2>
            <p>
                Ahoj,
                <br />
                opět jsme pro vás {/* !!! Do deterministic> randomItem('dali dohromady', 'sestavili') */ 'sestavili '}
                seznam událostí, na které se vyplatí zajít.
            </p>
            <p>
                Nově si také můžete přidat{' '}
                <a href="https://api.pavolhejny.com/czech-events/export/ical/czech-events.ics">
                    události přímo do svého kalendáře
                </a>
                .<br />
                {/* TODO: Nebo můžete ťuknout na ikonku 📅 a událost se pošle do vašeho kalendáře.  */}
            </p>
            <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.HEAD }} />
            <NewsletterComponent {...{ newsletter }} />
            <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.BOTTOM }} />
            <i>
                PS: Pokud nám v seznamu událostí některá chybí, <Link href="/propose">navrhněte nám ji!</Link>
                {/*PPS: E-mail posíláme na základě Vaší registrace na stránce{' '}
                <a href="https://czech.events/?utm_source=mail&amp;utm_medium=referral&amp;utm_campaign=2020-02_unsubscribe">
                    czech.events
                </a>
                . Pokud už další email nechcete dostat, napište nám rychlou odpověď. */}
            </i>

            <br />
            <br />
            <Shuffle seed={'authors'}>
                <a href="https://www.pavolhejny.com/?utm_source=czech.events-mail&amp;utm_medium=referral&amp;utm_campaign=signature">
                    Pavol Hejný
                </a>
                <></>
                {/* TODO: Place <>&nbsp;&amp;&nbsp;</> between */}
                {/* !!! <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza Texlová</a> */}
            </Shuffle>
            <>&nbsp;&amp;&nbsp;</>
            <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza Texlová</a>
        </>
    );
}
