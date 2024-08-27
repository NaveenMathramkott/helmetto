import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/layouts/Layout";
import { useCart } from "../../context/cartProvider";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import { textShorter } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import NoData from "../../components/noData/NoData";
import { useAuth } from "../../context/authProvider";

const Cart = () => {
  const count = 1;
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { cart, setCart, cartTotal, setCartTotal } = useCart();

  useEffect(() => {
    const totalCount = cart.map((item) => item.price * item.total);
    const count = totalCount?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    setCartTotal(count);
  }, [cart]);

  const addItem = (id) => {
    const selectedProduct = cart.filter((itm) => {
      if (itm._id === id) {
        itm.total += count;
      }
      return itm;
    });
    const totalCount = selectedProduct
      .map((item) => item.price * item.total)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setCartTotal(totalCount);
    setCart(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(selectedProduct));

    localStorage.setItem("cartTotal", JSON.stringify(totalCount));
  };
  const removeItem = (id) => {
    const filteredData = cart?.filter((itm) => {
      if (itm._id === id && itm.total !== 1) {
        itm.total -= count;
        return itm;
      } else if (itm._id !== id) return itm;
    });
    const totalCount = filteredData
      .map((item) => item.price * item.total)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setCartTotal(totalCount);
    setCart(filteredData);
    localStorage.setItem("cart", JSON.stringify(filteredData));
    localStorage.setItem("cartTotal", JSON.stringify(totalCount));
  };

  const toPaymentPage = () => {
    navigate(`/payment`);
  };

  return (
    <Layout title={`Cart Helmetto`}>
      {!auth?.user?.admin ? (
        <div>
          <div className="cart-mainWrapper">
            <div className="cart-container-left">
              <div className="cart-section-header">
                <h3>Shopping Cart</h3>
              </div>
              {cart.length > 0 ? (
                <table className="cart-table-data">
                  <tr className="cart-list-heading">
                    <th className="id">id</th>
                    <th className="photo">Photo</th>
                    <th className="name">Name</th>
                    <th className="quantity">Quantity</th>
                    <th className="price">Price</th>
                  </tr>
                  <>
                    {cart?.map((item, index) => (
                      <tr className="cart-list-data" key={item._id}>
                        <td className="id">{index + 1}</td>
                        <td className="photo">
                          <ImageViewer src={item.photo} alt={item.name} />
                        </td>
                        <td className="name">{textShorter(item.name)}</td>
                        <td className="quantity">
                          <button onClick={() => removeItem(item._id)}>
                            -
                          </button>
                          <span>{item.total}</span>
                          <button onClick={() => addItem(item._id)}>+</button>
                        </td>
                        <td className="total">₹ {item.total * item.price}</td>
                      </tr>
                    ))}
                  </>
                </table>
              ) : (
                <>
                  <NoData title={"No Items in Cart"} />
                </>
              )}
              <div className="payment-continue-web">
                <button
                  id="countinue-shop-button"
                  onClick={() => navigate("/")}
                >{`<- Continue Shopping`}</button>
                <button
                  className="payment-button"
                  onClick={toPaymentPage}
                  disabled={cartTotal === 0}
                >{`Continue Payment ₹${cartTotal}`}</button>
              </div>
            </div>
            <div className="cart-wrapper-onMobile">
              <div className="payment-continue-mobile">
                {cartTotal === 0 ? (
                  <button
                    id="countinue-shop-button"
                    onClick={() => navigate("/")}
                  >{`<- Continue Shopping`}</button>
                ) : (
                  <button
                    className="payment-button"
                    onClick={toPaymentPage}
                  >{`Continue Payment ₹${cartTotal}`}</button>
                )}
              </div>
              <div className="cart-section-header">
                <h3>Shopping Cart</h3>
              </div>
              {cart.length > 0 ? (
                <div className="cart-card-container">
                  {cart?.map((item) => (
                    <div className="cart-mobile-container" key={item._id}>
                      <div className="cart-mobile-image">
                        <ImageViewer src={item.photo} alt={item.name} />
                      </div>
                      <div>{item.name}</div>
                      <div className="cart-mobile-total">
                        <div className="cart-mobile-quantity">
                          <button onClick={() => removeItem(item._id)}>
                            -
                          </button>
                          <span>{item.total}</span>
                          <button onClick={() => addItem(item._id)}>+</button>
                        </div>
                        <div className="total">{item.total * item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <NoData title={`No items in Cart`} />
                </>
              )}
            </div>

            {/* {cart.length > 0 ? <Payment total={total} /> : null} */}
          </div>
        </div>
      ) : (
        <>
          <NoData title={`No cart Preview for Admin`} />
        </>
      )}
    </Layout>
  );
};

export default Cart;
