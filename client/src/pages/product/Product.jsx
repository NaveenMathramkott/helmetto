import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import "./style.css";
import { useParams } from "react-router-dom";
import { getOffer } from "../../utils/utils";
import { useCart } from "../../context/cartProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const Product = () => {
  const params = useParams();
  const { cart, setCart } = useCart();
  const [product, setProduct] = useState([]);
  // const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

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
    <Layout title={`${product.name}-Product-Emart`}>
      {product.length !== 0 ? (
        <div className="product-detail-mainWrapper">
          <div className="product-detail-left">
            <img src={product.photo} alt={product.name} />
          </div>
          <div className="product-detail-right">
            <h2>{product.name}</h2>
            <span>{product.description}</span>
            <div className="price-offer">
              <span id="price-mrp-detail">{`₹ ${getOffer(
                product.price,
                product.offer
              )}`}</span>
              <span>{`₹ ${product.price}`}</span>
              <span>{`${product.offer}% off`}</span>
            </div>
            {/* <div className="quantity">
              <span>Quantity</span>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: "50px" }}
              />
            </div> */}
            <div className="button-buy-cart">
              <button onClick={() => onAddToCart(product)}>Add to Cart</button>
              <button>Customize</button>
            </div>
            {/* <div className="button-configurator">
              <button>Customize</button>
            </div> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Product;
