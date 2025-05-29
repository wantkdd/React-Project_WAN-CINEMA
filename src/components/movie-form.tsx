import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import { LoadingSpinner } from './loading-spinner';

type MovieGridProps = {
  movies: Movie[];
  isLoading: boolean;
};

const MovieForm = ({ movies, isLoading }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ul className="bg-gray-800 p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies?.map((movie) => (
        <li key={movie.id} className="relative">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
            />
            <article className="opacity-0 flex flex-col text-white absolute inset-0 justify-center items-center backdrop-blur-md hover:opacity-100">
              <h2 className="font-bold text-center px-2">{movie.title}</h2>
              <p className="text-gray-300 text-sm mt-2 line-clamp-5 px-3">
                {movie.overview}
              </p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieForm;
