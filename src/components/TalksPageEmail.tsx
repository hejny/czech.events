import * as React from 'react';
import { DateRange } from '../model/DateRange';
import { Event, EventType } from '../model/database/Event';
import { categorizeEvents } from '../utils/categorizeEvents';
import { translateEventType } from '../utils/translate';
import { EventComponent } from './EventComponent';
import { NewsletterContent, NewsletterContentPosition } from '../model/database/NewsletterContent';
import { NewsletterContentsComponent } from './NewsletterContentsComponent';
import { eventTypeToNewsletterContentPosition } from '../utils/eventTypeToNewsletterContentPosition';
import { compareEventsbyDate } from '../utils/compareDates';
import { Newsletter } from '../model/database/Newsletter';

interface ITalksPageEmailProps {
    range: DateRange;
    events: Event[];
    newsletter: null | Newsletter;
}

export function TalksPageEmail(props: ITalksPageEmailProps) {
    const { events, range, newsletter } = props;

    const filteredEvents = events
        //.filter((event) => (event instanceof Event ? event.inMail : true))
        .filter((event) => (event instanceof Event ? range.isIn(event.dateToCompare) : true))
        .sort((a, b) => compareEventsbyDate(a, b));

    //console.log('filteredEvents', filteredEvents);
    const categorizedEvents = categorizeEvents(filteredEvents);

    const newsletterContents: NewsletterContent[] = [];
    if (newsletter) {
        newsletterContents.push(...newsletter.newsletterContents);
    }
    for (const event of filteredEvents) {
        newsletterContents.push(...event.newsletterContents);
    }

    return (
        <>
            <h2>
                {/*`📅 Konference / meetupy / hackathony – co se děje z IT / Startupové akce 🌆`*/}
                <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.SUBJECT }} />
            </h2>
            {/* Ahoj,
            <br />
            opět jsme dali dohromady seznam událostí, na které se vyplatí zajít:
            <br /> */}
            Ahoj,
            <br />
            bohužel aktuální situace nepřeje žádným konferencím, hackathonům ani jiným IT&amp;Startup událostem.
            <br />
            <br />
            Nebudeme rozepisovat všechny akce, které musely být zrušené. 😷 Místo toho vypíšeme alespoň ty skupiny,
            které přesunuly svoji činnost na webináře a remote meetupy. <br />
            <br />
            Nebudeme zmiňovat každý konkrétní event, protože se to v aktuálním chaosu rychle mění. V emailu vás odkážeme
            na zdroje, odkud se můžete o nových věcech průběžně dozvídat.
            <br />
            <br />
            <NewsletterContentsComponent {...{ newsletterContents, position: NewsletterContentPosition.HEAD }} />
            {Object.keys(categorizedEvents).map((type) => (
                <div key={type}>
                    <br />
                    <h2>{translateEventType(type as any)}</h2>
                    <NewsletterContentsComponent
                        {...{ newsletterContents, position: eventTypeToNewsletterContentPosition(type as EventType) }}
                    />
                    <span>
                        {categorizedEvents![type].map((event) => (
                            <EventComponent {...{ event, key: event.serializeId }} />
                        ))}
                    </span>
                </div>
            ))}
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
            {/* TODO: Random shuffle */}
            <a href="https://www.pavolhejny.com/?utm_source=czech.events-mail&amp;utm_medium=referral&amp;utm_campaign=signature">
                Pavol Hejný
            </a>
            &nbsp;&amp;&nbsp;
            <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza Texlová</a>
        </>
    );
}
