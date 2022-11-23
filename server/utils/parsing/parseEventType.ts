import { EventType } from '../../../src/model/database/Event';
import { findItemsWithBiggestQuantity } from '../findItemsWithBiggestQuantity';

export function parseEventType({
    keywordsFromName,
    keywordsFromDescription,
    durationInHours,
}: {
    keywordsFromName: string[];
    keywordsFromDescription: string[];
    durationInHours: number;
}): { type: EventType } {
    const possibleTypes: EventType[] = [];

    // Note: giving bigger priority to keywordsFromName
    for (const keywords of [keywordsFromName, [...keywordsFromName, ...keywordsFromDescription]]) {
        if (keywords.includes('hackathon')) possibleTypes.push(EventType.HACKATHON);
        if (keywords.includes('startup') && keywords.includes('weekend')) possibleTypes.push(EventType.HACKATHON);
        if (keywords.includes('meetup')) possibleTypes.push(EventType.MEETUP);
        if (keywords.includes('sraz')) possibleTypes.push(EventType.MEETUP);
        if (keywords.includes('srazu')) possibleTypes.push(EventType.MEETUP);
        if (keywords.includes('setkani')) possibleTypes.push(EventType.MEETUP);
        if (keywords.includes('workshop')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('workshopu')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('webinar')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('webinari')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('webinare')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('seminár')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('seminari')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('seminare')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('kurz')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('kurzu')) possibleTypes.push(EventType.WORKSHOP);
        if (keywords.includes('konference')) possibleTypes.push(EventType.CONFERENCE);
        if (keywords.includes('festival')) possibleTypes.push(EventType.CONFERENCE);
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
