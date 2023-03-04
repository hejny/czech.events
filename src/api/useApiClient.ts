import { useMemo } from 'react';
import { ApiClient } from './ApiClient';
import { getApiUrl } from './getApiUrl';

export function useApiClient(): ApiClient {
    const apiUrl = getApiUrl().href;
    const apiClient = useMemo(() => new ApiClient(apiUrl), [apiUrl]);

    return apiClient;
}

/**
 *  TODO: Use Next methods to fetch data
 */
