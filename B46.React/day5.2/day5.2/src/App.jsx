import React, { useState } from "react";

const products = [
  { id: 1, title: "Slim Shirt", category: "men's clothing" },
  { id: 2, title: "Smartphone", category: "electronics" },
  { id: 3, title: "Necklace", category: "jewelery" },
  { id: 4, title: "Women's Jacket", category: "women's clothing" },
  { id: 5, title: "Men's Watch", category: "men's clothing" },
];

const categories = [
  "all",
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Dashboard</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "1rem" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <li key={product.id}>
              <strong>{product.title}</strong> — {product.category}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
