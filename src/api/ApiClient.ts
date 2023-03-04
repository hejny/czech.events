import React from 'react';
import { Event } from '../model/database/Event';
import { Subscriber } from '../model/database/Subscriber';
import { constructObjectFromJSON } from '../utils/constructObjectFromJSON';

export const ApiClientContext = React.createContext<ApiClient | null>(null);

export class ApiClient {
    public constructor(private apiUrl: URL) {}

    public async getAbout() {}

    public async getEvents(): Promise<Event[]> {
        const data = await this.get(`events`);
        return data.map((data: any) => constructObjectFromJSON(Event, data));
    }

    public createEventCalendarUrl(event: Event): string {
        return `${this.apiUrl.href}export/ical/${encodeURIComponent(event.name)}.ics?serializeId=${encodeURIComponent(
            event.serializeId,
        )}`;
    }

    public async postSubscriber(subscriber: Subscriber): Promise<Subscriber> {
        const data = await this.post(
            `subscribers`,
            subscriber /* TODO: [0] Should be subscriber data directly in request body or should it be wrapped in {subscriber:{...}} */,
        );
        return constructObjectFromJSON(Subscriber, data);
    }

    public async postEventProposal(event: Partial<Event>): Promise<Event> {
        const data = await this.post(
            `/events`,
            event /* TODO: [0] Should be event data directly in request body or should it be wrapped in {event:{...}} */,
        );
        return constructObjectFromJSON(Event, data);
    }

    // TODO: Create AbscractApiClient library
    // TODO: Generically typed
    private async get(path: string /*TODO: Add option for query*/) {
        const response = await fetch(`${this.apiUrl.href}${path}`);
        const responseData = await response.json();
        return responseData;
    }

    // TODO: Create AbscractApiClient library
    // TODO: Generically typed
    private async post(path: string, data: {} /*TODO: Maybe add option for query*/) {
        const response = await fetch(`${this.apiUrl.href}${path}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    }
}
