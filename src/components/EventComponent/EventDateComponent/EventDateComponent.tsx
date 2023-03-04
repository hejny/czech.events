import React from 'react';
import moment from 'moment';
import 'moment/locale/cs';
import { Event } from '../../../model/database/Event';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

interface EventDateComponentProps {
    event: Event;
}

export function EventDateComponent({ event }: EventDateComponentProps) {
    const { date, year, month } = event;

    if (date) {
        try {
            moment.locale('cs');
            let dateString = moment(date).format('LLLL');

            // Note: "LLLL" produces date like "sobota 4. března 2023 11:47", following line is erasing the date:
            dateString = dateString.replace(/\d{1,2}:\d{1,2}$/, '');

            //TODO: More elegant way
            dateString = dateString.replace('leden', 'ledna');
            dateString = dateString.replace('února', 'února');
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
            if (!(error instanceof Error)) {
                throw error;
            }

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
