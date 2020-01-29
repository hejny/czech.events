import * as React from 'react';
import moment from 'moment';
import 'moment/locale/cs';

interface EventTimeComponentProps {
    time?: string;
}

export function EventTimeComponent({ time }: EventTimeComponentProps) {
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
