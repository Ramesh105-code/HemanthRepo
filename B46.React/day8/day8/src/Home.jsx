// File: src/pages/Home.jsx
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page') || 1);

  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (sort === 'price_asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [data, search, category, sort]);

  const totalPages = Math.ceil(filteredData.length / 6);
  const paginatedData = filteredData.slice((page - 1) * 6, page * 6);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Try Again</h2>;
  if (filteredData.length === 0) return <h2>No products match your criteria.</h2>;

  return (
    <div className={`app ${theme}`}>
      <nav>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => updateParams('search', e.target.value)}
        />
        <button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
      </nav>
      <div className="filters">
        <select onChange={(e) => updateParams('category', e.target.value)} value={category}>
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <select onChange={(e) => updateParams('sort', e.target.value)} value={sort}>
          <option value="">Sort</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div className="product-grid">
        {paginatedData.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
            <small>{item.category}</small>
            <p>⭐ {item.rating.rate}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => updateParams('page', page - 1)}
        >
          Previous
        </button>
        <span>{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => updateParams('page', page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
