import { Event } from '../model/database/Event';
import { constructObjectFromJSON } from '../utils/constructObjectFromJSON';
import { Subscriber } from '../model/database/Subscriber';
import { Newsletter } from '../model/database/Newsletter';

export class ApiClient {
    constructor(private apiUrl: string) {}

    async getAbout() {}

    async getEvents(): Promise<Event[]> {
        const data = await this.get(`/events`);
        return data.map((data) => constructObjectFromJSON(Event, data));
    }

    async getNewsletter(year: number, month: number): Promise<Newsletter> {
        const data = await this.get(`/newsletters/${year}/${month}`);
        return constructObjectFromJSON(Newsletter, data);
    }

    async postSubscriber(subscriber: Subscriber): Promise<Subscriber> {
        const data = await this.post(
            `/subscribers`,
            subscriber /* TODO: Should be subscriber data directly in request body or should it be wrapped in {subscriber:{...}} */,
        );
        return constructObjectFromJSON(Subscriber, data);
    }

    // TODO: Create AbscractApiClient library
    // TODO: Generically typed
    private async get(path: string /*TODO: Add option for query*/) {
        const response = await fetch(`${this.apiUrl}${path}`);
        const responseData = await response.json();
        return responseData;
    }

    // TODO: Create AbscractApiClient library
    // TODO: Generically typed
    private async post(path: string, data: {} /*TODO: Maybe add option for query*/) {
        const response = await fetch(`${this.apiUrl}${path}`, {
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

export const apiClient = new ApiClient(`http://localhost:3001`);
