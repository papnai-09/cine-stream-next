const BASE_URL = "https://api.themoviedb.org/3";

function getApiKey() {
  return (
    process.env.TMDB_API_KEY ||
    process.env.VITE_TMDB_API_KEY ||
    process.env.NEXT_PUBLIC_TMDB_API_KEY
  );
}

async function tmdbFetch(path, params = {}) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return { results: [], total_pages: 1 };
  }

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export function fetchPopularMovies(page = 1) {
  return tmdbFetch("/movie/popular", { page });
}

export function searchMovies(query, page = 1) {
  return tmdbFetch("/search/movie", { query, page });
}

export function fetchMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`);
}

export function getPosterUrl(path, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/window.svg";
}
