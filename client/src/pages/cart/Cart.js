import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/layouts/Layout";
import { useCart } from "../../context/cartProvider";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import { textShorter } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import NoData from "../../components/noData/NoData";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

const Cart = () => {
  const count = 1;
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState([]);
  const [paymentScreen, setPaymentScreen] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const totalCount = cart.map((item) => item.price * item.total);
    setTotal(totalCount);
  }, [cart]);
  const summaryTotal = () =>
    total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const addItem = (id) => {
    const selectedProduct = cart.filter((itm) => {
      if (itm._id === id) {
        itm.total += count;
      }
      return itm;
    });
    const totalCount = selectedProduct.map((item) => item.price * item.total);
    setTotal(totalCount);
    setCart(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(selectedProduct));
  };
  const removeItem = (id) => {
    const filteredData = cart?.filter((itm) => {
      if (itm._id === id && itm.total !== 1) {
        itm.total -= count;
        return itm;
      } else if (itm._id !== id) return itm;
    });
    const totalCount = filteredData.map((item) => item.price * item.total);
    setTotal(totalCount);
    setCart(filteredData);
    localStorage.setItem("cart", JSON.stringify(filteredData));
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/braintree/payment`,
        {
          nonce,
          cart,
          id: auth?.user?._id,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title={`Cart-Emart`}>
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
                        <td className="total">AED {item.total * item.price}</td>
                      </tr>
                    ))}
                  </>
                </table>
              ) : (
                <>
                  <NoData title={"No Items in Cart"} />
                </>
              )}
              <button
                id="countinue-shop-button"
                onClick={() => navigate("/")}
              >{`<- Continue Shopping`}</button>
            </div>
            <div className="cart-wrapper-onMobile">
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
            {cart.length > 0 ? (
              <div className="cart-container-right">
                <div className="cart-section-header">
                  <h3>Order Summary</h3>
                </div>
                <div className="cart-section-body">
                  <div id="addressUpdate">
                    {auth?.user?.address ? (
                      <span>{`Ship to : ${auth?.user?.address}`}</span>
                    ) : (
                      <button
                        id="addressUpdate-btn"
                        onClick={() =>
                          navigate("/dashboard/user", {
                            state: { dashboard: "Profile", profile: "/cart" },
                          })
                        }
                      >
                        Need to update Address
                      </button>
                    )}
                  </div>
                  <div className="cart-section-body-summary">
                    <span>Total</span>
                    <span>{`AED ${summaryTotal()}`}</span>
                  </div>

                  {auth.token ? (
                    <>
                      {paymentScreen ? (
                        <>
                          {!clientToken || !auth?.token || !cart?.length ? (
                            ""
                          ) : (
                            <div id="payment-screen-wrapper">
                              <DropIn
                                options={{
                                  authorization: clientToken,
                                  paypal: {
                                    flow: "vault",
                                  },
                                }}
                                onInstance={(instance) => setInstance(instance)}
                              />

                              <button
                                id="payment-btn"
                                onClick={handlePayment}
                                disabled={
                                  loading || !instance || !auth?.user?.address
                                }
                              >
                                {loading ? "Processing ...." : "Payment"}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <button onClick={() => setPaymentScreen(true)}>
                          Check Out
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              </div>
            ) : null}
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
