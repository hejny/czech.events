import { EventType } from '../model/database/Event';

export function getCharForEventTag(eventType: EventType): string {
    switch (eventType) {
        case EventType.CONFERENCE:
            return `🎤`;
        case EventType.MEETUP:
            return `💬`;
        case EventType.WORKSHOP:
            return `📚`;
        case EventType.HACKATHON:
            return `💻`;
    }
}
