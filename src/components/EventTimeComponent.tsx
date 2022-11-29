import moment from 'moment';
import 'moment/locale/cs';
import { IEventComponentProps } from './EventComponent';

export function EventTimeComponent({ event }: IEventComponentProps) {
    const { time } = event;

    if (!time) {
        return <></>;
    }

    try {
        moment.locale('cs');
        let timeString = moment(time, 'hh:mm').format('LT');
        if (timeString === 'Invalid date') {
            throw new Error(`Time was parsed as "Invalid date".`);
        }
        return <>⏱️&nbsp;{timeString}</>;
    } catch (error) {
        console.error(`Problem when parsing moment('2010-10-20 ' + '${time}').format('LT'); See more below:`);
        console.error(error);
        return <></>;
    }
}
