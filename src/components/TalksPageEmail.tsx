import * as React from 'react';
import { DateRange } from '../model/DateRange';
import { Event } from '../model/database/Event';
import { IEvents } from '../model/IEvents';
import { categorizeEvents } from '../utils/categorizeEvents';
import { translateEventType } from '../utils/translate';
import { ErrorComponent } from './ErrorComponent';
import { EventComponent } from './EventComponent';
import { EventCodeParagraph } from './EventCodeParagraph';

interface ITalksPageEmailProps {
    range: DateRange;
    events: IEvents;
}

export function TalksPageEmail(props: ITalksPageEmailProps) {
    const { events, range } = props;

    const filteredEvents = events
        .filter((event) => (event instanceof Event ? event.inMail : true))
        .filter((event) => (event instanceof Event ? range.isIn(event.dateToCompare) : true));

    //console.log('filteredEvents', filteredEvents);
    const categorizedEvents = categorizeEvents(filteredEvents);

    return (
        <>
            <h2>{`📅 Konference / meetupy / hackathony – co se děje z IT / Startupové akce 🌆`}</h2>
            Ahoj,
            <br />
            opět jsme dali dohromady seznam událostí, na které se vyplatí zajít:
            <br />
            {(filteredEvents.filter((e) => e instanceof Event) as Event[])
                .filter((e) => e.topParagraph)
                .sort((a, b) => (a.topParagraphOrder > b.topParagraphOrder ? 1 : -1))
                .map((event, i) => (
                    <p key={i} className={event.dateToCompare < new Date() ? 'past' : ''}>
                        {event.topParagraph}
                        <EventCodeParagraph {...{ event, verbose: false }} />
                    </p>
                ))}
            {Object.keys(categorizedEvents).map((type) => (
                <div key={type}>
                    <br />
                    <h2>{translateEventType(type as any)}</h2>
                    <span>
                        {categorizedEvents![type].map((item, key) =>
                            item instanceof Event ? (
                                <EventComponent {...{ event: item, key }} />
                            ) : (
                                <ErrorComponent {...{ key }}>{item}</ErrorComponent>
                            ),
                        )}
                    </span>
                </div>
            ))}
            <br /> <br />
            <i>
                PS: <b>Budeme rádi za vaše návrhy a připomínky</b>, můžete <b>odpovědět rovnou na email</b>.<br />
                PPS: E-mail posíláme na základě Vaší registrace na stránce{' '}
                <a href="https://czech.events/?utm_source=mail&amp;utm_medium=referral&amp;utm_campaign=2020-02_unsubscribe">
                    czech.events
                </a>
                . Pokud už další email nechcete dostat, napište nám rychlou odpověď.
            </i>
            {/*
            <br />
            PPS: Pokud už nechcete dostat další email, klikněte sem pro jejich odhlášení.
            */}
            <br />
            <br />
            <a href="https://www.pavolhejny.com/?utm_source=czech.events-mail&amp;utm_medium=referral&amp;utm_campaign=signature">
                Pavol Hejný
            </a>
            &nbsp;&amp;&nbsp;
            <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza Texlová</a>
        </>
    );
}
