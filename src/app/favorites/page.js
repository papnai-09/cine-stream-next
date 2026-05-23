import FavoritesClient from "@/components/FavoritesClient";

export const metadata = {
  title: "Favorites | CineStream",
  description: "Your saved CineStream movie watchlist stored in this browser.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
