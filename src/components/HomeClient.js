"use client";

import { useEffect, useRef, useState } from "react";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
}

export default function HomeClient({ initialMovies, initialTotalPages }) {
  const [movies, setMovies] = useState(initialMovies);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies(initialMovies);
      setTotalPages(initialTotalPages);
      setPage(1);
      return;
    }

    setMovies([]);
    setPage(1);
  }, [debouncedQuery, initialMovies, initialTotalPages]);

  useEffect(() => {
    if (!debouncedQuery && page === 1) {
      return;
    }

    async function loadMovies() {
      setIsLoading(true);

      const params = new URLSearchParams({ page: String(page) });
      if (debouncedQuery) {
        params.set("query", debouncedQuery);
      }

      try {
        const response = await fetch(`/api/movies?${params.toString()}`);
        const data = await response.json();

        setMovies((current) => {
          const nextMovies = data.results ?? [];
          return page === 1 ? nextMovies : [...current, ...nextMovies];
        });
        setTotalPages(data.total_pages ?? 1);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [debouncedQuery, page]);

  const lastElementRef = (node) => {
    if (isLoading || page >= totalPages) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((current) => current + 1);
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  };

  return (
    <div className="home-container">
      <SearchBar value={query} onChange={setQuery} />

      <section className="movies-section">
        <h1 className="section-title">
          {query ? `Search Results for "${query}"` : "Popular Movies"}
        </h1>
        <MovieGrid movies={movies} lastElementRef={lastElementRef} />
        {isLoading && <p className="loader-text">Loading more movies...</p>}
      </section>
    </div>
  );
}
