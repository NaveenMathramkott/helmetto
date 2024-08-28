import { useCart } from "../../context/cartProvider";
import toast from "react-hot-toast";
import { useCustomization } from "../../context/Customization";

const CartButton = () => {
  const { customCart, cart, setCart } = useCart();
  const { customParts } = useCustomization();
  // const [totalPrice, setTotalPrice] = useState(0);
  // useEffect(() => {
  //   const total = customProducts.reduce((accumulator, item) => {
  //     return accumulator + (item.price || 0);
  //   }, 0);

  //   setTotalPrice(total);
  // }, [customProducts]);
  console.log("cartButton", customParts);

  const onAddCartItem = () => {
    if (customCart) {
      customCart.parts = customParts;
    }
    const checkCart = cart.filter((itm) => itm._id === customCart._id);
    if (checkCart.length >= 1) {
      toast.success("Already Added to the cart");
    } else {
      setCart([...cart, customCart]);
      localStorage.setItem("cart", JSON.stringify([...cart, customCart]));
      toast.success("Item Added to cart");
    }
  };

  return (
    <div className="header-mainWrapper">
      <button className="cartButton" onClick={onAddCartItem}>
        Add to Cart
      </button>
      {/* <div className="header-price-list">
        {customParts?.map((item, index) => {
          return item.price ? (
            <div key={`${item.name}-${index}`} className="price-list-separator">
              <span>{`${item.name}`}</span>
              <span>{`${item.price}`}</span>
            </div>
          ) : null;
        })}
        <span className="header-price">₹ {totalPrice}/-</span>
      </div> */}
    </div>
  );
};

export default CartButton;
