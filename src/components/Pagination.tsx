type Props = {
  page: number;
  totalPages: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, disabled, onPageChange }: Props) {
  return (
    <nav className="pagination" aria-label="Movie pages">
      <button disabled={disabled || page <= 1} onClick={() => onPageChange(page - 1)}>Previous</button>
      <span aria-live="polite">Page {page} of {totalPages}</span>
      <button disabled={disabled || page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </nav>
  );
}
