import { useMemo } from 'react';
import { ApiClient } from './ApiClient';

export function useApiClient(): ApiClient {
    /*
    TODO:
    TODO: Use Next methods to fetch data
    let apiUrl: string;


        if (window.location.hostname === 'localhost') {
            apiUrl = 'http://localhost:7755';
            // selfUrl = 'http://localhost:17754';
        } else {
            apiUrl = 'https://api.pavolhejny.com/czech-events';
            // selfUrl = 'https://czech.events';
        }
    }
    */

    const apiUrl = 'https://api.pavolhejny.com/czech-events';

    const apiClient = useMemo(() => new ApiClient(apiUrl), [apiUrl]);

    return apiClient;
}
