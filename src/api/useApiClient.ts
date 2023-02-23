import { useMemo } from 'react';
import { ApiClient } from './ApiClient';

export function useApiClient(): ApiClient {
    let apiUrl: string;

    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        apiUrl = 'http://localhost:17755';
    } else {
        apiUrl = 'https://api.pavolhejny.com/czech-events';
    }

    const apiClient = useMemo(() => new ApiClient(apiUrl), [apiUrl]);

    return apiClient;
}

/**
 *  TODO: Use Next methods to fetch data
 */
