import * as React from 'react';
import styled from 'styled-components';
import { Event, EventVisibility } from '../model/database/Event';
import { EventCodeParagraph } from './EventCodeParagraph';
import { EventDateComponent } from './EventDateComponent';
import { EventPrice } from './EventPrice';
import { EventTimeComponent } from './EventTimeComponent';

interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <EventSpan>
            <span className={`${event.dateToCompare < new Date() ? 'past' : ''}`}>
                {event.visibility === EventVisibility.FEATURED ? '⭐' : ''}
                <a href={event.web.toString()} target="_blank" rel="nofolow noopener noreferrer">
                    <b>{event.name}</b>
                    {event.topic ? ` – ${event.topic}` : ''}
                </a>
                <br />
                {event.canceled === 1 && <>🚫&nbsp;Zrušeno&nbsp;</>}
                {event.online === 1 && <>🌍&nbsp;Online&nbsp;</>}
                {event.city && (
                    <>
                        🌆&nbsp;{event.city}&nbsp;{/* TODO: Plzeň místo 🌆 dát jako easter egg 🐪 */}
                    </>
                )}
                <EventDateComponent {...{ event }} />
                <EventTimeComponent {...{ event }} />
                &nbsp;
                <EventPrice {...{ event }} />
                <EventCodeParagraph {...{ event, verbose: true, showCode: false }} />
                {}
                <br />
                <br />
                {}
            </span>
        </EventSpan>
    );
}

const EventSpan = styled.form`
    .past {
        opacity: 0.5;
    }

    .canceled {
        opacity: 0.5;
        text-decoration: line-through;
    }
`;
