import React, { useEffect, useState } from "react";
import "./style.css";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import NoData from "../../components/noData/NoData";
import toast from "react-hot-toast";
import { textShorter } from "../../utils/utils";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import moment from "moment";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/order-status/${orderId}`,
        {
          status: value,
        }
      );
      console.log("orders data", data);

      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-list-mainWrapper">
      <table className="product-box-container">
        <tr className="product-box-header">
          <div className="product-box-header-left">
            <h3>All Orders</h3>
            <span>{`Number of orders : ${orders?.length} `}</span>
          </div>
          <div className="product-box-header-right">
            <button onClick={() => toast.success(`No report for now`)}>
              Get Report
            </button>
          </div>
        </tr>
        {orders.length > 0 ? (
          <>
            <thead>
              <tr className="product-list-heading">
                <th className="id">id</th>
                <th className="status">Status</th>
                <th className="name">Buyer</th>
                <th className="date">Date</th>
                <th className="payment">Payment</th>
                <th className="quantity">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item, index) => (
                <>
                  <tr className="product-list-data">
                    <td className="id">{index + 1}</td>
                    <td className="status">
                      <select
                        onChange={(value) =>
                          handleChange(item._id, value.target.value)
                        }
                        defaultValue={item?.status}
                      >
                        {status.map((itm, ind) => (
                          <option key={ind} value={itm}>
                            {itm}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="name">{item?.buyer?.name}</td>
                    <td className="date">{moment(item?.createAt).fromNow()}</td>
                    <td className="payment">
                      {item?.payment?.success ? "Success" : "Failed"}
                    </td>
                    <td className="quantity">{item?.products?.length}</td>
                  </tr>
                  <div className="product-list-wrapper">
                    {item?.products?.map((prod, i) => (
                      <tr className="product-list-data">
                        <td className="img">
                          <ImageViewer src={prod.photo} alt={prod.name} />
                        </td>
                        <td className="name">{textShorter(prod.name)}</td>
                        <td className="description">
                          {textShorter(prod.description)}
                        </td>
                        <td className="price">AED {prod.price}</td>
                        <td className="address">Category</td>
                        <td className="quantity">{prod.total}</td>
                      </tr>
                    ))}
                  </div>
                </>
              ))}
            </tbody>
          </>
        ) : (
          <>
            <NoData />
          </>
        )}
      </table>
    </div>
  );
};

export default OrderList;
