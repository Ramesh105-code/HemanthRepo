// src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/cart/cartSlice';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>🛒 Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ margin: '10px 0' }}>
            <span>{item.name} - ₹{item.price}</span>
            <button onClick={() => dispatch(removeItem(item.id))} style={{ marginLeft: '10px' }}>
              Remove
            </button>
          </div>
        ))
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
