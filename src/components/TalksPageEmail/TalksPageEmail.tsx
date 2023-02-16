import { Event } from '../../model/database/Event';
import { NewsletterContentPosition } from '../../model/database/NewsletterContent';
import { DateRange } from '../../model/DateRange';
import { createNewsletter } from '../../utils/createNewsletter';
import { joinArray } from '../../utils/joinArray';
import { randomItem } from '../../utils/randomItem';
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
                Nebo můžete ťuknout na ikonku 📅 a událost se pošle do vašeho kalendáře.
            </p>
            <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.HEAD }} />
            <NewsletterComponent {...{ newsletter }} />
            <br /> <br />
            <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.BOTTOM }} />
            {/* <i>
                PS: <b>Budeme rádi za vaše návrhy a připomínky</b>, můžete <b>odpovědět rovnou na email</b>.<br />
                PPS: E-mail posíláme na základě Vaší registrace na stránce{' '}
                <a href="https://czech.events/?utm_source=mail&amp;utm_medium=referral&amp;utm_campaign=2020-02_unsubscribe">
                    czech.events
                </a>
                . Pokud už další email nechcete dostat, napište nám rychlou odpověď.
            </i> */}
            {/*
            <br />
            PPS: Pokud už nechcete dostat další email, klikněte sem pro jejich odhlášení.
            */}
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
        </>
    );
}
