import { Event } from '../model/database/Event';

export class ApiClient {
    constructor(private apiUrl: string) {}

    async getAbout() {}

    async getEvents(): Promise<Event[]> {
        const response = await fetch(`${this.apiUrl}/events`);
        const data = await response.json();

        return data;
    }
}

export const apiClient = new ApiClient(`http://localhost:3001`);
