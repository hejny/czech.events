import moment from 'moment';
import 'moment/locale/cs';

export function showDate(date: Date): string {
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
        dateString = dateString.substr(0, 1).toUpperCase() + dateString.substr(1);
        return dateString;
    } catch (error) {
        throw new Error(`Problem when parsing moment('${date}').format('LLLL');`);
    }
}
export function showTime(time: string): string {
    try {
        moment.locale('cs');
        let timeString = moment('2010-10-20 ' + time).format('LT');
        return timeString;
    } catch (error) {
        throw new Error(`Problem when parsing moment('2010-10-20 ' + '${time}').format('LT');`);
    }
}