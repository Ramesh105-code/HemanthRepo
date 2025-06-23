// src/App.js
import React from 'react';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🛍️ Shopping Cart</h1>
      <Products />
      <hr />
      <Cart />
    </div>
  );
}

export default App;
