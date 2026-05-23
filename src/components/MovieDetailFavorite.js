"use client";

import { useFavorites } from "@/context/FavoritesContext";

export default function MovieDetailFavorite({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  return (
    <button
      className={`detail-favorite ${isFavorite ? "active" : ""}`}
      onClick={() => toggleFavorite(movie)}
    >
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
}
