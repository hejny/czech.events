import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseTimesAndDates({ semanticEvent }: { semanticEvent: ISemanticEvent }) {
    const startDate = new Date(semanticEvent.startDate);
    const endDate = new Date(semanticEvent.endDate || semanticEvent.startDate);

    const days =
        startDate.getDate() === endDate.getDate()
            ? startDate.getDate().toString()
            : `${startDate.getDate()}-${endDate.getDate()}`;
    const durationInHours = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;
    return { days, durationInHours, startDate };
}
