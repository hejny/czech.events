import * as React from 'react';
import { Event } from '../model/Event';
import moment from 'moment';
import 'moment/locale/cs';

interface EventTimeComponentProps {
    event: Event;
}

export function EventTimeComponent({ event }: EventTimeComponentProps) {
    const { time } = event;

    if (!time) {
        return <></>;
    }

    try {
        moment.locale('cs');
        let timeString = moment('2010-10-20 ' + time).format('LT');
        return <>⏱️&nbsp;{timeString}</>;
    } catch (error) {
        throw new Error(`Problem when parsing moment('2010-10-20 ' + '${time}').format('LT');`);
    }
}
