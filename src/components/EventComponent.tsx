import * as React from 'react';
import { Event } from '../../server/database/Event';
import { EventPrice } from './EventPrice';
import { EventCodeParagraph } from './EventCodeParagraph';
import { EventDateComponent } from './EventDateComponent';
import { EventTimeComponent } from './EventTimeComponent';

interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <span className={event.dateToCompare < new Date() ? 'past' : ''}>
            {event.topParagraph ? '⭐' : ''}
            <a href={event.web.toString()} target="_blank" rel="nofolow noopener noreferrer">
                <b>{event.name}</b>
                {event.topic ? ` – ${event.topic}` : ''}
            </a>
            <br />
            <>🌆&nbsp;{event.city}</>
            &nbsp;
            <EventDateComponent {...{ event }} />
            <EventTimeComponent {...{ event }} />
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
