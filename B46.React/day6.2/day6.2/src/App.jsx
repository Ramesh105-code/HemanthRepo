import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
