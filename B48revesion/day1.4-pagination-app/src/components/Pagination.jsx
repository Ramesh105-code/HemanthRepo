import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {/* Numbered Pagination */}
      <div>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              background: currentPage === number ? "#007bff" : "#f0f0f0",
              color: currentPage === number ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Dropdown Pagination */}
      <select
        value={currentPage}
        onChange={(e) => handlePageChange(Number(e.target.value))}
        style={{ padding: "5px" }}
      >
        {pageNumbers.map((number) => (
          <option key={number} value={number}>
            Page {number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
