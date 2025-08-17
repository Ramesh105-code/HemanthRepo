import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartSummary = () => {
  const { cart, removeFromCart, totalPrice } = useContext(CartContext);

  return (
    <div className="p-6 border-l">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.title} (x{item.qty})
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3 className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default CartSummary;
