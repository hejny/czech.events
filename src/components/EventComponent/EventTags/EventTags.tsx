import React from 'react';
import styled from 'styled-components';
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
        tags.push(<EventTagSpan key="canceled">🚫&nbsp;Zrušeno&nbsp;</EventTagSpan>);
    }
    if (event.city) {
        tags.push(
            <EventTagSpan key="city">
                {getCharForCity(event.city)}&nbsp;{event.city}&nbsp;
            </EventTagSpan>,
        );
    }
    if (event.online) {
        tags.push(<EventTagSpan key="online">🌍&nbsp;Online&nbsp;</EventTagSpan>);
    }

    tags.push(
        <EventTagSpan key="date">
            <CalendarLink event={event}>
                <EventDateComponent {...{ event }} />
            </CalendarLink>
        </EventTagSpan>,
    );
    tags.push(
        <EventTagSpan key="time">
            <EventTimeComponent {...{ event }} />
        </EventTagSpan>,
    );
    tags.push(
        <EventTagSpan key="price">
            <EventPrice {...{ event }} />
        </EventTagSpan>,
    );

    return tags;
}

const EventTagSpan = styled.span`
    /*border: 1px dashed red;*/

    &:not(:first-child) {
        padding-left: 0.1rem;
        margin-left: 0.1rem;

        /*
        border-left: 1px solid #777;
        /*margin-left: 0px;*/
    }
`;
