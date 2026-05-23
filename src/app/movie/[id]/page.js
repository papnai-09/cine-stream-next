import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMovieDetails, getPosterUrl } from "@/lib/tmdb";
import MovieDetailFavorite from "@/components/MovieDetailFavorite";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);

  if (!movie?.id) {
    return {
      title: "Movie not found | CineStream",
      description: "The requested movie could not be found on CineStream.",
    };
  }

  const year = movie.release_date?.split("-")[0];
  const title = `${movie.title}${year ? ` (${year})` : ""} | CineStream`;
  const description =
    movie.overview ||
    `View ratings, release details, and synopsis for ${movie.title} on CineStream.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: movie.poster_path ? [getPosterUrl(movie.poster_path, "w780")] : [],
    },
  };
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);

  if (!movie?.id) {
    notFound();
  }

  const releaseYear = movie.release_date?.split("-")[0] || "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "Runtime N/A";

  return (
    <article className="detail-page">
      <Link className="back-link" href="/">
        Back to movies
      </Link>

      <div className="detail-layout">
        <img
          className="detail-poster"
          src={getPosterUrl(movie.poster_path, "w780")}
          alt={`${movie.title} poster`}
        />

        <div className="detail-copy">
          <p className="eyebrow">{releaseYear}</p>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}

          <div className="detail-meta">
            <span>Star {rating}</span>
            <span>{runtime}</span>
            <span>{movie.status || "Status N/A"}</span>
          </div>

          <MovieDetailFavorite movie={movie} />

          <section>
            <h2>Overview</h2>
            <p>{movie.overview || "No description available."}</p>
          </section>

          {!!movie.genres?.length && (
            <div className="genre-list">
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
