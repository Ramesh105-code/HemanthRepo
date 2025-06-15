// pages/Products.jsx
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'asc';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const itemsPerPage = 6;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = useMemo(() => {
    let data = [...products];
    if (search) data = data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') data = data.filter(p => p.category === category);
    if (sort === 'asc') data.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') data.sort((a, b) => b.price - a.price);
    return data;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    setSearchParams({ search, category, sort, page: newPage });
  };

  return (
    <div>
      <h1>Products</h1>
      <select onChange={(e) => setSearchParams({ search, category: e.target.value, sort, page: 1 })} value={category}>
        <option value="all">All</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
      </select>

      <select onChange={(e) => setSearchParams({ search, category, sort: e.target.value, page: 1 })} value={sort}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      {paginated.length === 0 ? <p>No products found</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {paginated.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default Products;
