import { EventType } from '../../../src/model/database/Event';
import { ISemanticEvent } from '../../interfaces/jsonld/ISemanticEvent';

export function parseEventType({
    semanticEvent,
    keywords,
    durationInHours,
}: {
    semanticEvent: ISemanticEvent;
    keywords: string[];
    durationInHours: number;
}) {
    let type = EventType.CONFERENCE;
    if (keywords.includes('hackathon')) type = EventType.HACKATHON;
    if (keywords.includes('startup weekend')) type = EventType.HACKATHON;
    if (keywords.includes('meetup')) type = EventType.MEETUP;
    if (keywords.includes('sraz')) type = EventType.MEETUP;
    if (keywords.includes('workshop')) type = EventType.WORKSHOP;
    if (keywords.includes('webinář')) type = EventType.WORKSHOP;
    if (keywords.includes('kurz')) type = EventType.WORKSHOP;
    if (durationInHours < 4 && type === EventType.CONFERENCE) type = EventType.MEETUP;
    return { type };
}
