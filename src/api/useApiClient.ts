import { useMemo } from 'react';
import { ApiClient } from './ApiClient';
import { getApiUrl } from './getApiUrl';

export function useApiClient(): ApiClient {
  return useMemo(() => new ApiClient(getApiUrl()),[]);

}
