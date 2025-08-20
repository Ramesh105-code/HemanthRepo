import React from "react";

function ProductCard({ product, onStockChange }) {
  console.log("Render:", product.name);
  return (
    <div style={{ border: "1px solid gray", margin: "5px", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>
        ${product.price} | Stock: {product.stock}
      </p>
      <button onClick={() => onStockChange(product.id, product.stock - 1)}>
        Sell 1
      </button>
    </div>
  );
}

export default React.memo(ProductCard); 
