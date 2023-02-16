import React from 'react';
import { Event } from '../../model/database/Event';
import { EventCodeParagraph } from '../EventCodeParagraph/EventCodeParagraph';
import { EventSummary } from './EventSummary/EventSummary';
import { EventTags } from './EventTags/EventTags';

export interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <span className={`${event.dateToCompare < new Date() ? 'past-event' : 'future-event'}`}>
            <EventSummary {...{ event }} />
            <br />
            <EventTags {...{ event }} />
            <EventCodeParagraph {...{ event, verbose: true, showCode: false }} />
            <br />
            <br />
        </span>
    );
}
