import React from 'react';
import styles from './EventComponent.module.css';
import { Event } from '../../model/database/Event';
import { EventCodeParagraph } from '../EventCodeParagraph/EventCodeParagraph';
import { EventSummary } from './EventSummary/EventSummary';
import { EventTags } from './EventTags/EventTags';

export interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <span className={`${event.dateToCompare < new Date() ? styles.past : ''}`}>
            <EventSummary {...{ event }} />
            <br />
            <EventTags {...{ event }} />
            <EventCodeParagraph {...{ event, verbose: true, showCode: false }} />
            <br />
            <br />
        </span>
    );
}
