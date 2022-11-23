export function parseCancel({ keywords }: { keywords: string[] }) {
    let canceled = false;

    if (keywords.includes('zruseno')) canceled = true;
    if (keywords.includes('canceled')) canceled = true;
    if (keywords.includes('postponed')) canceled = true;
    return { canceled };
}

/**
 * TODO: !!! isCanceled
 * TODO: !!! Probbably try to fetch the event web url and from it determine if it is canceled
 */
