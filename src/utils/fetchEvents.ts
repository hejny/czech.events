import { IConfigSource } from 'configchecker';
import { decapitalize, emptyKeysAsUndefined, isNotEmpty } from 'configchecker/lib/utils/object';
import papaparse from 'papaparse';
import { EVENTS_CSV_URL } from '../config';
import { Event } from '../model/Event';
import { compareEventsbyDate } from './compareDates';

export async function fetchEvents(): Promise<(Event | string)[]> {
    const response = await fetch(EVENTS_CSV_URL, { cache: 'reload' });
    const dataString = await response.text();
    const { data } = papaparse.parse(dataString, {
        header: true,
    });

    //console.log('data', data);

    return (data as IConfigSource[])
        .map((object) =>
            emptyKeysAsUndefined<string | undefined>(
                object,
                (value) => !['', 'write', 'NULL'].includes((value || '').trim()),
            ),
        )
        .map(decapitalize)
        .filter(isNotEmpty)
        .filter((t) => t['inMail'])
        .map((t) => {
            try {
                return new Event(t);
            } catch (error) {
                return error.message;
                //return error as Error;//Event.error(error);
            }
        })
        .sort(compareEventsbyDate);
    //.filter(isEvent);
}

function isEvent(t: any): t is Event {
    return t instanceof Event;
}
