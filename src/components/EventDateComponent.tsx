import 'moment/locale/cs';

import moment from 'moment';
import * as React from 'react';

import { Event } from '../model/database/Event';
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
            dateString = dateString.replace('leden', 'ledna');
            dateString = dateString.replace('únor', 'února');
            dateString = dateString.replace('březen', 'března');
            dateString = dateString.replace('duben', 'dubna');
            dateString = dateString.replace('květen', 'května');
            dateString = dateString.replace('červen', 'června');
            dateString = dateString.replace('červnaec', 'červenec'); // This is typo in moment/locale/cs library. We can make an pull request to it but this is the quick local hotfix.
            dateString = dateString.replace('červenec', 'července');
            dateString = dateString.replace('srpen', 'srpna');
            dateString = dateString.replace('září', 'září');
            dateString = dateString.replace('říjen', 'října');
            dateString = dateString.replace('listopad', 'listopadu');
            dateString = dateString.replace('prosinec', 'prosince');
            dateString = capitalizeFirstLetter(dateString);
            return <>📅&nbsp;{dateString}</>;
        } catch (error) {
            console.error(`Problem when parsing moment('${date}').format('LLLL'); See more below:`);
            console.error(error);
            return <></>;
        }
    } else if (year && month) {
        let monthString = moment(month, 'M').format('MMMM');
        monthString = capitalizeFirstLetter(monthString);
        monthString = monthString.replace('Červnaec', 'Červenec'); // This is typo in moment/locale/cs library. We can make an pull request to it but this is the quick local hotfix.
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
