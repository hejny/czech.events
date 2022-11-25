import { IKeywords } from 'n12';
import { EventType } from '../../../src/model/database/Event';
import { findItemsWithBiggestQuantity } from '../findItemsWithBiggestQuantity';

export function parseEventType({
    keywordsFromName,
    keywordsFromDescription,
    durationInHours,
}: {
    keywordsFromName: IKeywords;
    keywordsFromDescription: IKeywords;
    durationInHours: number;
}): { type: EventType } {
    const possibleTypes: EventType[] = [];

    // TODO: Giving bigger priority to keywordsFromName
    for (const keywords of [keywordsFromName, new Set([...keywordsFromName, ...keywordsFromDescription])]) {
        if (keywords.has('hackathon')) possibleTypes.push(EventType.HACKATHON);
        if (keywords.has('startup') && keywords.has('weekend')) possibleTypes.push(EventType.HACKATHON);
        if (keywords.has('meetup')) possibleTypes.push(EventType.MEETUP);
        if (keywords.has('sraz')) possibleTypes.push(EventType.MEETUP);
        if (keywords.has('srazu')) possibleTypes.push(EventType.MEETUP);
        if (keywords.has('setkani')) possibleTypes.push(EventType.MEETUP);
        if (keywords.has('workshop')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('workshopu')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('webinar')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('webinari')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('webinare')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('seminár')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('seminari')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('seminare')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('kurz')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('kurzu')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.has('konference')) possibleTypes.push(EventType.CONFERENCE);
        if (keywords.has('festival')) possibleTypes.push(EventType.CONFERENCE);
    }

    if (durationInHours < 2.5) possibleTypes.push(EventType.MEETUP, EventType.WORKSHOP);

    // TODO: More signs of type;

    const bestPossibleTypes = findItemsWithBiggestQuantity(possibleTypes);

    // console.log({ name, durationInHours, keywordsFromName, keywordsFromDescription, possibleTypes, bestPossibleTypes });

    for (const type of [EventType.MEETUP, EventType.HACKATHON, EventType.WORKSHOP, EventType.CONFERENCE]) {
        if (bestPossibleTypes.includes(type)) return { type };
    }

    return { type: EventType.CONFERENCE };
}
