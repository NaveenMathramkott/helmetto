import React from "react";
import "./style.css";
import { getOffer, textShorter } from "../../utils/utils";
import { useCart } from "../../context/cartProvider";
import toast from "react-hot-toast";

const ProductCard = ({ data, onClick }) => {
  const { cart, setCart } = useCart();

  const balance = (data?.offer * data?.price) / 100;

  const onAddToCart = (prod) => {
    const checkCart = cart.filter((itm) => itm._id === prod._id);
    if (checkCart.length >= 1) {
      toast.success("Already Added to the cart");
    } else {
      setCart([...cart, prod]);
      localStorage.setItem("cart", JSON.stringify([...cart, prod]));
      toast.success("Item Added to cart");
    }
  };
  return (
    <div className="productCard-mainWrapper">
      <div className="productCard-container" onClick={onClick}>
        <div className="productCard-image-container">
          <img src={data?.photo} alt={data?.name} />
        </div>
        <div id="detail-section">
          <span id="name">{textShorter(data?.name)}</span>

          <span id="price">
            <span id="price-mrp">₹ {getOffer(data?.price, data?.offer)}</span> ₹{" "}
            {data?.price}
          </span>
          {data?.offer && <span id="offer">Save - ₹ {balance}</span>}
        </div>
      </div>
      <button id="add-to-cart-product-button" onClick={() => onAddToCart(data)}>
        add to cart
      </button>
      {data?.offer && (
        <div className="offer-tag">
          <span>{`${data?.offer}% off`}</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
