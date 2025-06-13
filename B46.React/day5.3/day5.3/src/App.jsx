import React, { useState, useEffect, useMemo, useCallback } from "react";
import FilterPanel from "./components/FilterPanel";
import ProductList from "./components/ProductList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return ["all", ...new Set(allCategories)];
  }, [products]);

  const filteredAndSorted = useMemo(() => {
    console.log("Filtering & Sorting");
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [products, search, category, sortOrder]);

  const handleBuyNow = useCallback((title) => {
    alert(`Purchased: ${title}`);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛍️ Product Explorer</h1>
      <FilterPanel
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ProductList products={filteredAndSorted} onBuy={handleBuyNow} />
      )}
    </div>
  );
}
