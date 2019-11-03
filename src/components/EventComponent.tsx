import Head from 'next/head';
import * as React from 'react';
import { PAGE_TITLE } from '../config';
import { Event } from '../model/Event';
import { translateCurrency } from '../utils/translate';
import moment from 'moment';

interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    return (
        <>
            <a href={event.web.toString()} target="_blank" rel="nofolow noopener noreferrer">
                <b>{event.name}</b>
                {event.topic ? ` – ${event.topic}` : ''}
            </a>
            <br />
            <>🌆&nbsp;{event.city}</>
            &nbsp;
            <>📅&nbsp;{showDate(event.date)}</>
            &nbsp;
            <>⏱️&nbsp;{event.time}</>
            &nbsp;
            <>
                💸&nbsp;
                {((price: number) => {
                    if (price === 0) return 'Zdarma';
                    return `${Math.ceil(price * 100) / 100} ${translateCurrency(event.priceCurrency!)}`;
                })(event.priceAmount)}
            </>
            {/*TODO: Code*/}
            <br />
            <br />
            {/*
                <a href="https://www.barcampbrno.cz/2019/index.html"><b>DevOps Summit</b>  – Budoucnost je v udržitelnosti</a>
                🌆&nbsp;Ostrava 📅&nbsp;Čtvrtek 3. Října ⏱️&nbsp;10:00 💸&nbsp;450 Kč
            */}
        </>
    );
}

function showDate(date: Date): string {
    // TODO: Better
    moment.locale('cs');
    let dateString = moment(date).format('LLLL');
    dateString = dateString.split('0:00')[0];
    dateString = dateString.replace('listopad', 'Listopadu');
    dateString = dateString.replace('prosinec', 'Prosince');
    dateString = dateString.substr(0, 1).toUpperCase() + dateString.substr(1);
    return dateString;
}
