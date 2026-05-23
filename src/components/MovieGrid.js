import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ movies, lastElementRef }) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => {
        const isLast = movies.length === index + 1;

        return (
          <div ref={isLast ? lastElementRef : undefined} key={`${movie.id}-${index}`}>
            <MovieCard movie={movie} />
          </div>
        );
      })}
    </div>
  );
}
