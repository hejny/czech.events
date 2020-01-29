import * as React from 'react';
import { Event } from '../model/Event';
import moment from 'moment';
import 'moment/locale/cs';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

interface EventDateComponentProps {
    event: Event;
}

export function EventDateComponent({ event }: EventDateComponentProps) {
    const { date, year, month } = event;

    if (date) {
        try {
            moment.locale('cs');
            let dateString = moment(date).format('LLLL');
            dateString = dateString.split('0:00')[0];
            //TODO: More elegant way
            dateString = dateString.replace('leden', 'Ledna');
            dateString = dateString.replace('únor', 'Února');
            dateString = dateString.replace('březen', 'Března');
            dateString = dateString.replace('duben', 'Dubna');
            dateString = dateString.replace('květen', 'Května');
            dateString = dateString.replace('červen', 'Června');
            dateString = dateString.replace('červenec', 'Července');
            dateString = dateString.replace('srpen', 'Srpna');
            dateString = dateString.replace('září', 'Září');
            dateString = dateString.replace('říjen', 'Října');
            dateString = dateString.replace('listopad', 'Listopadu');
            dateString = dateString.replace('prosinec', 'Prosince');
            dateString = capitalizeFirstLetter(dateString);
            return <>📅&nbsp;{dateString}</>;
        } catch (error) {
            throw new Error(`Problem when parsing moment('${date}').format('LLLL');`);
        }
    } else if (year && month) {
        let monthString = moment(month, 'M').format('MMMM');
        monthString = capitalizeFirstLetter(monthString);
        return (
            <>
                📅&nbsp;{monthString} {year}
            </>
        );
    } else {
        return <></>;
    }
}

interface EventTimeComponentProps {
    time: string;
}
