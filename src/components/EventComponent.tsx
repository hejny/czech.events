import Head from 'next/head';
import * as React from 'react';
import { PAGE_TITLE } from '../../config';
import { Event } from '../model/Event';
import { translateCurrency } from '../../../utils/translate';
import moment from 'moment';
import { isNullOrUndefined } from 'util';

interface IEventComponentProps {
    event: Event;
}

export function EventComponent({ event }: IEventComponentProps) {
    const renderPrice = (price?: number) => {
        if (isNullOrUndefined(price)) return '';
        if (price === 0) return <>💸&nbsp;Zdarma</>;
        return <>💸&nbsp;{`${Math.ceil(price * 100) / 100} ${translateCurrency(event.priceCurrency!)}`}</>;
    };

    return (
        <span>
            <a href={event.web.toString()} target="_blank" rel="nofolow noopener noreferrer">
                <b>{event.name}</b>
                {event.topic ? ` – ${event.topic}` : ''}
            </a>
            <br />
            <>🌆&nbsp;{event.city}</>
            &nbsp;
            <>📅&nbsp;{showDate(event.date)}</>
            {event.time && (
                <>
                    &nbsp;
                    <>⏱️&nbsp;{showTime(event.time)}</>
                </>
            )}
            &nbsp;
            <>{renderPrice(event.priceAmount)}</>
            <>
                {event.codeName && event.codePercent && event.priceAmount && event.priceCurrency && (
                    <>
                        <br />A s kódem <b>{event.codeName}</b> to budeš mít o {Math.floor(event.codePercent * 100)}%
                        levnější tzn. za {renderPrice(event.priceAmount * (1 - event.codePercent))}.
                    </>
                )}
            </>
            {}
            <br />
            <br />
            {}
        </span>
    );
}

function showDate(date: Date): string {
    try {
        moment.locale('cs');
        let dateString = moment(date).format('LLLL');
        dateString = dateString.split('0:00')[0];
        dateString = dateString.replace('listopad', 'Listopadu');
        dateString = dateString.replace('prosinec', 'Prosince');
        dateString = dateString.substr(0, 1).toUpperCase() + dateString.substr(1);
        return dateString;
    } catch (error) {
        throw new Error(`Problem when parsing moment('${date}').format('LLLL');`);
    }
}

function showTime(time: string): string {
    try {
        moment.locale('cs');
        let timeString = moment('2010-10-20 ' + time).format('LT');
        return timeString;
    } catch (error) {
        throw new Error(`Problem when parsing moment('2010-10-20 ' + '${time}').format('LT');`);
    }
}
