import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import SearchControls from "./components/SearchControls";
import Pagination from "./components/Pagination";
import { sortMovies, type Movie, type SortOrder } from "./lib/movies";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Wait briefly after typing, then start the new search on page one.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim() !== query) {
        setQuery(searchText.trim());
        setPage(1);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, query]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ query, page: String(page) });
        const response = await fetch(`/api/movies?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load movies. Please try again.");
        const data = await response.json() as { results: Movie[]; total_pages: number };
        if (controller.signal.aborted) return;
        setMovies(data.results);
        // TMDB permits requests for pages 1 through 500.
        setTotalPages(Math.max(1, Math.min(data.total_pages, 500)));
      } catch (err) {
        if (controller.signal.aborted) return;
        setMovies([]);
        setError(err instanceof Error ? err.message : "Could not load movies.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadMovies();
    // Prevent an older search response from replacing newer results.
    return () => controller.abort();
  }, [query, page, retry]);

  function handleSearch() {
    if (searchText.trim() !== query) {
      setQuery(searchText.trim());
      setPage(1);
    }
  }

  const visibleMovies = sortMovies(movies, sortOrder);
  const busy = loading || searchText.trim() !== query;

  return (
    <>
      <header className="site-header"><h1>Movie Explorer</h1></header>
      <SearchControls
        searchText={searchText}
        sortOrder={sortOrder}
        onSearchChange={setSearchText}
        onSortChange={setSortOrder}
        onSearch={handleSearch}
      />
      <main aria-label="Movies" aria-busy={busy}>
        {loading && movies.length === 0 && <p className="status" role="status">Loading movies...</p>}
        {error && (
          <div className="status" role="alert">
            <p>{error}</p>
            <button onClick={() => setRetry(retry + 1)}>Try again</button>
          </div>
        )}
        {!loading && !error && movies.length === 0 && (
          <p className="status" role="status">No movies found for “{query}”.</p>
        )}
        <div className="movie-grid">
          {visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </main>
      <Pagination
        page={page}
        totalPages={totalPages}
        disabled={busy || !!error || movies.length === 0}
        onPageChange={setPage}
      />
      <footer className="attribution">
        <a href="https://www.themoviedb.org/" aria-label="The Movie Database">
          <img src="/tmdb-logo.svg" alt="TMDB" width="80" height="11" />
        </a>
        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </>
  );
}
