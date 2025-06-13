import React from "react";

export default function FilterPanel({ search, setSearch, minPrice, setMinPrice }) {
  console.log("Rendering FilterPanel");

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
    </div>
  );
}
