import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage = 5, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // Don't render if only 1 page

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={currentPage === num ? 'active' : ''}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;