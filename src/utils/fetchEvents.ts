//import fetch from 'unfetch';
import { IConfigSource } from 'configchecker';
import { decapitalize, emptyKeysAsUndefined, isNotEmpty } from 'configchecker/lib/utils/object';
import fetch from 'isomorphic-unfetch';
import papaparse from 'papaparse';
import { EVENTS_CSV_URL } from '../config';
import { Event } from '../model/Event';
import { isNull } from 'util';

export async function fetchEvents(): Promise<(Event)[]> {
    const response = await fetch(EVENTS_CSV_URL, { cache: 'reload' });
    const dataString = await response.text();
    const { data } = papaparse.parse(dataString, {
        header: true,
    });

    console.log('data', data);

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
                return null;
                //return error as Error;//Event.error(error);
            }
        })
        .filter(isEvent);
}

function isEvent(t: any): t is Event {
    return t instanceof Event;
}
