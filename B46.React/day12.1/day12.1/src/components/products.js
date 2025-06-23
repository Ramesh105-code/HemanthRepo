// src/components/Products.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const products = [
  { id: 1, name: 'Shoes', price: 1200 },
  { id: 2, name: 'Watch', price: 2500 },
  { id: 3, name: 'Bag', price: 1500 },
];

const Products = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map((item) => (
        <div key={item.id} style={{ margin: '10px 0' }}>
          <span>{item.name} - ₹{item.price} </span>
          <button onClick={() => dispatch(addItem(item))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
