import { useCallback, useEffect, useMemo, useState } from 'react';
import { Movie } from '../types/movie';
import { FALLBACK_MOVIES } from '../data/fallbackMovies';
import { fetchNowPlaying } from '../services/movies';

interface UseNowPlayingOptions {
  limit?: number;
}

interface UseNowPlayingResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  offline: boolean;
}

export function useNowPlaying({ limit }: UseNowPlayingOptions = {}): UseNowPlayingResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offline, setOffline] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const applyLimit = useCallback(
    (items: Movie[]) => (limit ? items.slice(0, limit) : items),
    [limit],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setOffline(false);

    try {
      const remoteMovies = await fetchNowPlaying();
      setMovies(applyLimit(remoteMovies));
    } catch (err) {
      console.warn('[useNowPlaying] falling back to offline data', err);
      setMovies(applyLimit(FALLBACK_MOVIES));
      setOffline(true);
      setError('Não foi possível conectar ao servidor. Mostrando sugestões offline.');
    } finally {
      setLoading(false);
    }
  }, [applyLimit]);

  useEffect(() => {
    load();
  }, [load]);

  const safeMovies = useMemo(() => {
    if (movies.length > 0) {
      return movies;
    }
    return applyLimit(FALLBACK_MOVIES);
  }, [applyLimit, movies]);

  return {
    movies: safeMovies,
    loading,
    error,
    refresh: load,
    offline,
  };
}
