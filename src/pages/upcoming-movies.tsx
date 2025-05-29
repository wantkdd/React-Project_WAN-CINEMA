import MovieForm from '../components/movie-form';
import Pagination from '../components/pagination';
import { useMovies } from '../hooks/useMovies';

const UpcomingMoviesPage = () => {
  const { movies, isLoading, error, page, nextPage, prevPage } =
    useMovies('upcoming');

  if (error) {
    return (
      <div className="text-center text-3xl font-bold text-red-500 flex justify-center items-center h-screen">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Pagination
        currentPage={page}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />
      <MovieForm movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default UpcomingMoviesPage;
