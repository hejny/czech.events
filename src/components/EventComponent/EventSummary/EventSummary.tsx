import React from 'react';
import { EventVisibility } from '../../../model/database/Event';
import { IEventComponentProps } from '../EventComponent';

export function EventSummary({ event }: IEventComponentProps) {
    return (
        <>
            {event.visibility === EventVisibility.FEATURED ? <>⭐</> : <></>}
            <a href={event.web.toString()} target="_blank" rel="nofolow noopener noreferrer">
                <b>{event.name}</b>
                {event.topic ? ` – ${event.topic}` : ''}
            </a>
        </>
    );
}
