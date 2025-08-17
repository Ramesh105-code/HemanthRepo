import React from "react";
import ProductList from "../components/ProductList";
import CartSummary from "../components/CartSummary";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <ProductList />
      </div>
      <div className="w-1/3">
        <CartSummary />
      </div>
    </div>
  );
};

export default Home;
