// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsPage } from '../features/products/productsSlice';

const ProductList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const dispatch = useDispatch();
  const { pages, loading, error } = useSelector((state) => state.products);
  const products = pages[pageIndex] || [];

  useEffect(() => {
    dispatch(fetchProductsPage(pageIndex));
  }, [dispatch, pageIndex]);

  return (
    <div>
      <h2>Product Dashboard</h2>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {loading && <p>Loading...</p>}

      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.title}</strong> - ${prod.price}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))} disabled={pageIndex === 0}>
          Prev
        </button>
        <span style={{ margin: '0 10px' }}>Page: {pageIndex + 1}</span>
        <button onClick={() => setPageIndex((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;
