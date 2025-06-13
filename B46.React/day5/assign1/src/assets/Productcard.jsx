import React from "react";

function ProductCard({ product, onBuy }) {
  console.log(`Rendering ProductCard: ${product.title}`);

  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => onBuy(product.title)}>Buy Now</button>
    </div>
  );
}

export default React.memo(ProductCard);
