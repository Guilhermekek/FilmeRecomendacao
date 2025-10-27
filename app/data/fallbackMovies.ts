import filmes from '../(tabs)/filmes.json';
import { Movie } from '../types/movie';

export const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4';

export const FALLBACK_MOVIES: Movie[] = (filmes as Movie[]).map(movie => ({
  titulo: movie.titulo,
  poster: movie.poster ?? FALLBACK_POSTER,
  nota: movie.nota,
  sinopse: movie.sinopse,
  trailer: movie.trailer,
}));

export const HERO_PLACEHOLDER_COPY =
  'Explore as histórias, elencos favoritos e recomendações criadas especialmente para o seu gosto.';
