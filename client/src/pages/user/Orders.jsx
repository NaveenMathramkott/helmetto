import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import NoData from "../../components/noData/NoData";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  const getOrders = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/orders`,
        {
          id: auth?.user?._id,
        }
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="product-list-mainWrapper">
      <table className="product-box-container">
        <tr className="product-box-header">
          <tr className="product-box-header-left">
            <h3>All Orders</h3>
            <span>{`Number of orders : ${orders?.length} `}</span>
          </tr>
        </tr>
        {orders.length > 0 ? (
          <>
            <thead>
              <tr className="product-list-heading">
                <th className="id">id</th>
                <th className="status">Status</th>
                <th className="date">date</th>
                <th className="payment">Payment</th>
                <th className="quantity">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item, index) => (
                <>
                  <tr className="product-list-data">
                    <td className="id">{index + 1}</td>
                    <td className="status">{item?.status}</td>
                    <td className="date">{moment(item?.createAt).fromNow()}</td>
                    <td className="payment">
                      {item?.payment?.success ? "Success" : "Failed"}
                    </td>
                    <td className="quantity">{item?.products?.length}</td>
                  </tr>
                  <div className="product-list-wrapper">
                    {item?.products?.map((prod, i) => (
                      <div className="product-list-map" key={prod._id}>
                        <div className="img">
                          <ImageViewer src={prod.photo} alt={prod.name} />
                        </div>
                        <div style={{ paddingLeft: "10px" }}>
                          <p>{prod.name}</p>
                          <p>{prod.description.substring(0, 30)}</p>
                          <p>Price : AED {prod.price}</p>
                        </div>
                      </div>
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

export default Orders;
