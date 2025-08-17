import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {items.map((product) => (
        <div key={product.id} className="border p-4 shadow-md rounded-md">
          <img src={product.image} alt={product.title} className="h-32 mx-auto" />
          <h2 className="font-bold text-lg mt-2">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
