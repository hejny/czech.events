import { IJsonldEvent } from '../../interfaces/jsonld/IJsonldEvent';

export function parseTimesAndDates({ jsonldEvent }: { jsonldEvent: IJsonldEvent }) {
    const startDate = new Date(jsonldEvent.startDate);
    const endDate = new Date(jsonldEvent.endDate || jsonldEvent.startDate);

    const days =
        startDate.getDate() === endDate.getDate()
            ? startDate.getDate().toString()
            : `${startDate.getDate()}-${endDate.getDate()}`;
    const durationInHours = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;
    return { days, durationInHours, startDate };
}
