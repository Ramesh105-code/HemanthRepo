// components/ProductCard.jsx
function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} alt={product.title} width="100" height="100" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>Category: {product.category}</p>
      {product.rating.rate > 4.5 && <span>🔥</span>}
      {product.rating.rate < 2 && <span>⚠️</span>}
    </div>
  );
}

export default ProductCard;