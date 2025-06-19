const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <div>
    <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button key={i} onClick={() => onPageChange(i + 1)}>
        {i + 1}
      </button>
    ))}
    <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
  </div>
);
