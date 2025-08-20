import React, { useState, useMemo, useCallback } from "react";
import ProductHeader from "./ProductHeader";
import ProductCard from "./ProductCard";
import Summary from "./Summary";

const initialProducts = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics", rating: 4.5, stock: 10 },
  { id: 2, name: "Shoes", price: 50, category: "Fashion", rating: 4.2, stock: 25 },
  { id: 3, name: "Phone", price: 600, category: "Electronics", rating: 4.7, stock: 15 },
  { id: 4, name: "Watch", price: 200, category: "Fashion", rating: 4.1, stock: 8 },
  { id: 5, name: "Book", price: 20, category: "Stationery", rating: 4.9, stock: 50 },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");


  const visibleProducts = useMemo(() => {
    let filtered = filter === "All" ? products : products.filter(p => p.category === filter);
    return [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, filter, sortOrder]);

 
  const totalPrice = useMemo(
    () => visibleProducts.reduce((sum, p) => sum + p.price, 0),
    [visibleProducts]
  );

  const handleStockChange = useCallback((id, newStock) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, stock: newStock } : p))
    );
  }, []);

  return (
    <div>
      <ProductHeader count={visibleProducts.length} filter={filter} />

      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Stationery</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {visibleProducts.map(p => (
        <ProductCard key={p.id} product={p} onStockChange={handleStockChange} />
      ))}

      <Summary totalPrice={totalPrice} />
    </div>
  );
}
