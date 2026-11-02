import type { SortOrder } from "../lib/movies";

type Props = {
  searchText: string;
  sortOrder: SortOrder;
  onSearchChange: (text: string) => void;
  onSortChange: (sort: SortOrder) => void;
  onSearch: () => void;
};

export default function SearchControls(props: Props) {
  return (
    <form className="controls" role="search" onSubmit={(event) => {
      event.preventDefault();
      props.onSearch();
    }}>
      <input
        type="search"
        aria-label="Search for a movie"
        placeholder="Search for a movie..."
        value={props.searchText}
        onChange={(event) => props.onSearchChange(event.target.value)}
      />
      <select
        aria-label="Sort movies"
        value={props.sortOrder}
        onChange={(event) => props.onSortChange(event.target.value as SortOrder)}
      >
        <option value="">Sort By</option>
        <option value="release-asc">Release Date (Asc)</option>
        <option value="release-desc">Release Date (Desc)</option>
        <option value="rating-asc">Rating (Asc)</option>
        <option value="rating-desc">Rating (Desc)</option>
      </select>
    </form>
  );
}
