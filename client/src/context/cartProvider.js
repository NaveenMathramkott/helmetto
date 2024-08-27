import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    let existingCartTotal = localStorage.getItem("cartTotal");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
    if (existingCartTotal) setCartTotal(JSON.parse(existingCartTotal));
  }, []);

  return (
    <CartContext.Provider value={{ cart, cartTotal, setCart, setCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
