"use client";

import Link from "next/link";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb";
import { useFavorites } from "@/context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <article className="movie-card">
      <Link href={`/movie/${movie.id}`} className="movie-link">
        <Image
          src={getPosterUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="movie-poster"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 180px"
        />
        <div className="movie-overlay">
          <h3>{movie.title}</h3>
          <p className="rating">Star {rating}</p>
          <p className="overview">{movie.overview || "No description available."}</p>
        </div>
      </Link>

      <button
        className={`favorite-btn icon-favorite ${isFavorite ? "active" : ""}`}
        onClick={() => toggleFavorite(movie)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "Saved" : "Save"}
      </button>

      <div className="movie-card-footer">
        <h2>{movie.title}</h2>
        <span>{releaseYear}</span>
      </div>
    </article>
  );
}
