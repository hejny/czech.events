import { IKeywords } from 'n12';

export function parseCancel({ keywords }: { keywords: IKeywords }) {
    let isCanceled = false;

    if (keywords.has('zruseno')) isCanceled = true;
    if (keywords.has('canceled')) isCanceled = true;
    if (keywords.has('postponed')) isCanceled = true;
    return { isCanceled };
}

/**
 * TODO: Probbably try to fetch the event web url and from it determine if it is canceled
 */
