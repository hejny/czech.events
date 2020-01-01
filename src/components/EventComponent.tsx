import * as React from 'react';
import { Event } from '../model/Event';
import { EventPrice } from './EventPrice';
import { EventCodeParagraph } from './EventCodeParagraph';
import { showDate, showTime } from '../utils/showDateAndTime';

interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <span className={event.date < new Date() ? 'past' : ''}>
            {event.topParagraph ? '⭐' : ''}
            <a href={event.web.toString()} target="_blank" rel="nofolow noopener noreferrer">
                <b>{event.name}</b>
                {event.topic ? ` – ${event.topic}` : ''}
            </a>
            <br />
            <>🌆&nbsp;{event.city}</>
            &nbsp;
            <>📅&nbsp;{showDate(event.date)}</>
            {event.time && (
                <>
                    &nbsp;
                    <>⏱️&nbsp;{showTime(event.time)}</>
                </>
            )}
            &nbsp;
            <EventPrice {...{ event }} />
            <EventCodeParagraph {...{ event, verbose: true }} />
            {}
            <br />
            <br />
            {}
        </span>
    );
}
