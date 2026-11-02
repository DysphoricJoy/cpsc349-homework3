export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type SortOrder = "" | "release-asc" | "release-desc" | "rating-asc" | "rating-desc";

export function sortMovies(movies: Movie[], order: SortOrder): Movie[] {
  // Like the demo, sort the current page. Copy first to preserve React state
  // and the API's original order when "Sort By" is selected again.
  const sorted = [...movies];
  if (order.startsWith("release")) {
    sorted.sort((a, b) => {
      if (!a.release_date && !b.release_date) return 0;
      if (!a.release_date) return 1;
      if (!b.release_date) return -1;
      const difference = a.release_date.localeCompare(b.release_date);
      return order === "release-asc" ? difference : -difference;
    });
  } else if (order === "rating-asc") {
    sorted.sort((a, b) => a.vote_average - b.vote_average);
  } else if (order === "rating-desc") {
    sorted.sort((a, b) => b.vote_average - a.vote_average);
  }
  return sorted;
}
