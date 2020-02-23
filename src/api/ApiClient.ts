import { Event } from '../model/database/Event';
import { constructObjectFromJSON } from '../utils/constructObjectFromJSON';

export class ApiClient {
    constructor(private apiUrl: string) {}

    async getAbout() {}

    async getEvents(): Promise<Event[]> {
        const response = await fetch(`${this.apiUrl}/events`);
        const data = await response.json();

        return data.map((data) => constructObjectFromJSON(Event, data));
    }
}

export const apiClient = new ApiClient(`http://localhost:3001`);
