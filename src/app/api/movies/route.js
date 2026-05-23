import { NextResponse } from "next/server";
import { fetchPopularMovies, searchMovies } from "@/lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();
  const page = Number(searchParams.get("page") || "1");

  try {
    const data = query
      ? await searchMovies(query, page)
      : await fetchPopularMovies(page);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message, results: [], total_pages: 1 },
      { status: 502 }
    );
  }
}
