import React, { useState, useMemo, useCallback } from "react";
import ProductList from "./ProductList";
import FilterPanel from "./FilterPanel";

const PRODUCTS = [
  { id: 1, title: "Macbook Pro", price: 1800 },
  { id: 2, title: "iPhone 13", price: 999 },
  { id: 3, title: "AirPods", price: 199 },
  { id: 4, title: "iPad", price: 699 },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");

  console.log("Rendering App");

  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return PRODUCTS.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) &&
        (!minPrice || product.price >= parseFloat(minPrice))
    );
  }, [search, minPrice]);

  const handleBuyNow = useCallback((title) => {
    alert(`Purchased: ${title}`);
  }, []);

  return (
    <div>
      <h1>Product Store</h1>
      <FilterPanel
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
      />
      <ProductList products={filteredProducts} onBuy={handleBuyNow} />
    </div>
  );
}
