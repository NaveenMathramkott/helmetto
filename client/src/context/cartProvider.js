import { useState, useContext, createContext, useEffect } from "react";
// import { configOptions } from "./data";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [customCart, setCustomCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));

    let existingCustomCartItem = localStorage.getItem("customCart");
    if (existingCustomCartItem)
      setCustomCart(JSON.parse(existingCustomCartItem));

    let existingCartTotal = localStorage.getItem("cartTotal");
    if (existingCartTotal) setCartTotal(JSON.parse(existingCartTotal));
  }, []);
  // useEffect(() => {
  //   // const helmetPrice = { name: "helmetto Ak-6", price: 6500, type: "helmet" };
  //   const data = configOptions.map((item) => {
  //     const data = item.data[0];
  //     return { name: data.name, price: data.price, type: item.type };
  //   });
  //   // data.unshift(helmetPrice);
  //   setCustomProducts(data);
  // }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        customCart,
        setCart,
        setCartTotal,
        setCustomCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
