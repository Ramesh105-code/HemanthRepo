import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onBuy }) {
  console.log("Rendering ProductList");

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} />
      ))}
    </div>
  );
}
