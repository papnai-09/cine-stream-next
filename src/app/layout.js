import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

export const metadata = {
  title: "CineStream | Popular movies and favorites",
  description:
    "Discover popular movies, search TMDB titles, and keep a browser-based favorites watchlist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <div className="app-container">
            <nav className="navbar">
              <div className="navbar-content">
                <Link href="/" className="navbar-brand">
                  <span className="brand-icon" aria-hidden="true">
                    CS
                  </span>
                  <span className="brand-name">CineStream</span>
                </Link>
                <NavLinks />
              </div>
            </nav>

            <main className="main-content">{children}</main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
