import { useState } from 'react';
import { MovieResponse } from '../types/movie';
import { useCustomFetch } from './useCustomFetch';

export const useMovies = (classification: string) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error, refetch } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${classification}?language=ko-KR&page=${page}`,
    [classification, page]
  );

  const nextPage = () => {
    setPage((p) => p + 1);
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((p) => p - 1);
      window.scrollTo(0, 0);
    }
  };

  return {
    movies: data?.results || [],
    isLoading,
    error,
    page,
    nextPage,
    prevPage,
    refetch,
  };
};
