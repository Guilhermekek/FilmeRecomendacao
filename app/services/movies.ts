import { fetchFromApi } from './api';
import { Movie } from '../types/movie';

interface MovieResponse {
  titulo?: string;
  title?: string;
  poster?: string;
  backdrop_path?: string;
  vote_average?: number;
  overview?: string;
  sinopse?: string;
  nota?: number;
  trailer?: string;
}

const PLACEHOLDER_POSTER = 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4';

function mapMovie(movie: MovieResponse): Movie {
  return {
    titulo: movie.titulo ?? movie.title ?? 'Filme sem título',
    poster: movie.poster ?? movie.backdrop_path ?? PLACEHOLDER_POSTER,
    nota: movie.nota ?? movie.vote_average,
    sinopse: movie.sinopse ?? movie.overview,
    trailer: movie.trailer,
  };
}

export async function fetchNowPlaying(): Promise<Movie[]> {
  const data = await fetchFromApi<MovieResponse[]>('/filmes/now-playing');
  return data.map(mapMovie);
}
