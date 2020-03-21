import { BoardApiClient } from './BoardApiClient';

export class ApiClient {
    constructor(private apiUrl: string) {}

    public async getAbout(): Promise<{ version: string }> {
        return this.get('/about');
    }

    public boardApiClient(boardUuid: string): BoardApiClient {
        return new BoardApiClient(this.apiUrl, boardUuid);
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
