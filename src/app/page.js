import HomeClient from "@/components/HomeClient";
import { fetchPopularMovies } from "@/lib/tmdb";

export default async function Home() {
  const data = await fetchPopularMovies(1);

  return (
    <HomeClient
      initialMovies={data.results ?? []}
      initialTotalPages={data.total_pages ?? 1}
    />
  );
}
