import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cartProvider";
import { useAuth } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import "./style.css";
import Layout from "../../components/layouts/Layout";

const Payment = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { cart, setCart, cartTotal } = useCart();

  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientToken, setClientToken] = useState("");

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

  console.log("payment page", cartTotal);
  return (
    <Layout title={`Payment Helmetto`}>
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
            <span>{`₹ ${cartTotal}`}</span>
          </div>

          {auth.token ? (
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
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />

                  <button
                    id="payment-btn"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                    style={{
                      backgroundColor:
                        loading || !instance || !auth?.user?.address
                          ? "gray"
                          : "#ffcc00",
                      opacity:
                        loading || !instance || !auth?.user?.address ? 0.2 : 1,
                    }}
                  >
                    {loading ? "Processing ...." : "Prceed Payment"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => navigate("/login", { state: "/cart" })}>
              Please Login to Checkout
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
