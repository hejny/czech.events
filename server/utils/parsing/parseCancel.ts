export function parseCancel({ keywords }: { keywords: string[] }) {
    let isCanceled = false;

    if (keywords.includes('zruseno')) isCanceled = true;
    if (keywords.includes('canceled')) isCanceled = true;
    if (keywords.includes('postponed')) isCanceled = true;
    return { isCanceled };
}

/**
 * TODO: !!! Probbably try to fetch the event web url and from it determine if it is canceled
 */
