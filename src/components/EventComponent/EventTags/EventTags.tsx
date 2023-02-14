import React from 'react';
import styles from './EventTags.module.css';
import { Event } from '../../../model/database/Event';
import { CalendarLink } from './CalendarLink/CalendarLink';
import { IEventComponentProps } from '../EventComponent';
import { EventDateComponent } from '../EventDateComponent/EventDateComponent';
import { EventPrice } from '../EventPrice/EventPrice';
import { EventTimeComponent } from '../EventTimeComponent/EventTimeComponent';
import { getCharForCity } from './getCharForCity';

export function EventTags({ event }: IEventComponentProps) {
    return <span>{getEventTags(event)}</span>;
}

export function getEventTags(event: Event): JSX.Element[] {
    const tags: JSX.Element[] = [];

    /*
    tags.push(<EventTagSpan key="type">{getCharForEventTag(event.type)}</EventTagSpan>);
    */

    if (event.canceled === 1) {
        tags.push(
            <span className={styles.canceled} key="canceled">
                🚫&nbsp;Zrušeno&nbsp;
            </span>,
        );
    }
    if (event.city) {
        tags.push(
            <span key="city">
                {getCharForCity(event.city)}&nbsp;{event.city}&nbsp;
            </span>,
        );
    }
    if (event.online) {
        tags.push(<span key="online">🌍&nbsp;Online&nbsp;</span>);
    }

    tags.push(
        <span key="date">
            <CalendarLink event={event}>
                <EventDateComponent {...{ event }} />
            </CalendarLink>
        </span>,
    );
    tags.push(
        <span key="time">
            <EventTimeComponent {...{ event }} />
        </span>,
    );
    tags.push(
        <span key="price">
            <EventPrice {...{ event }} />
        </span>,
    );

    return tags;
}
