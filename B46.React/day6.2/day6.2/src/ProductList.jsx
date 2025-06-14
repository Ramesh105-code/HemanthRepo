import { Link } from 'react-router-dom';
import products from '../data/products';

const ProductList = () => {
  return (
    <div>
      <h1>Product Catalog</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
