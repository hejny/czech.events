import * as React from 'react';
import { DateRange } from '../model/DateRange';
import { Event } from '../model/Event';
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

    const filteredEvents = events.filter((event) => (event instanceof Event ? range.isIn(event.dateToCompare) : true));

    //console.log('filteredEvents', filteredEvents);
    const categorizedEvents = categorizeEvents(filteredEvents);

    return (
        <>
            <h2>{`📅 Konference / meetupy / hackathony – co se děje z IT / Startupové akce 🌆`}</h2>
            Ahoj,
            <br />
            opět jsme dali dohromady seznam událostí, na které se vyplatí zajít:
            <br />
            {(events.filter((e) => e instanceof Event) as Event[])
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
            <br />
            <i>
                PS: <b>Budeme rádi za vaše návrhy a připomínky</b>, můžete <b>odpovědět rovnou na email</b>.
            </i>
            {/*
            <br />
            PPS: Pokud už nechcete dostat další email, klikněte sem pro jejich odhlášení.
            */}
            <br />
            <br />
            <a href="https://www.pavolhejny.com/">Pavol</a>
            &nbsp;&amp;&nbsp;
            <a href="https://www.linkedin.com/in/tereza-texlova/">Tereza</a>
        </>
    );
}
