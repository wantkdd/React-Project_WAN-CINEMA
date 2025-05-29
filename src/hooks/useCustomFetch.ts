import axios from 'axios';
import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseFetchResult<T> extends ApiResponse<T> {
  refetch: () => Promise<void>;
}

export const useCustomFetch = <T>(
  url: string,
  dependencies: React.DependencyList = []
): UseFetchResult<T> => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      });
      setState({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: null,
        isLoading: false,
        error: '🚨요청에 실패했습니다. 무언가가 잘못 된 것이 분명하다..🚨',
      });
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [...dependencies, url]);

  const refetch = async () => {
    await fetchData();
  };

  return {
    ...state,
    refetch,
  };
};
