import Head from 'next/head';
import * as React from 'react';
import { PAGE_TITLE } from '../config';
import { Event } from '../model/Event';

interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <>
            <a href={(event.web || '').toString()} target="_blank" rel="nofolow noopener noreferrer">
                <b>{event.name}</b> – {event.topic}
            </a>
            <br />
            🌆&nbsp;{event.city}
            📅&nbsp;Čtvrtek 3. Října ⏱️&nbsp;{event.time}
            💸&nbsp;{event.price}
            <br />
            <br />
        </>
    );
}
