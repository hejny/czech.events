import * as React from 'react';
import styled from 'styled-components';
import { Event } from '../model/database/Event';
import { EventCodeParagraph } from './EventCodeParagraph';
import { EventSummary } from './EventSummary';
import { EventTags } from './EventTags';

export interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <EventSpan>
            <span className={`${event.dateToCompare < new Date() ? 'past' : ''}`}>
                <EventSummary {...{ event }} />
                <br />
                <EventTags {...{ event }} />
                <EventCodeParagraph {...{ event, verbose: true, showCode: false }} />
                <br />
                <br />
            </span>
        </EventSpan>
    );
}

const EventSpan = styled.span`
    .past {
        opacity: 0.5;
    }

    .canceled {
        opacity: 0.5;
        text-decoration: line-through;
    }
`;
