"use client";

import MovieGrid from "@/components/MovieGrid";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesClient() {
  const { favorites } = useFavorites();

  return (
    <section className="favorites">
      <h1>My Favorites</h1>
      <p className="favorites-count">
        {favorites.length} {favorites.length === 1 ? "movie" : "movies"} saved
      </p>
      <MovieGrid movies={favorites} />
    </section>
  );
}
