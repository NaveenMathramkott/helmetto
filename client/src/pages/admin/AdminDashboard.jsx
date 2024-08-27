import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/authProvider";
import OrderList from "./OrderList";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import Users from "./Users";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [selectedTab, setSlelectedTab] = useState("Orders");

  const setTabFunction = (event) => {
    setSlelectedTab(event.currentTarget.innerHTML);
  };
  return (
    <Layout title={`Admin Panel - Ecommerce`}>
      <div className="adminPanel-mainWrapper">
        <div className="adminPanel-leftSection">
          <AdminMenu onClick={setTabFunction} active={selectedTab} />
        </div>
        <div className="adminPanel-rightSection">
          {selectedTab === "Orders" && <OrderList />}
          {selectedTab === "Categories" && <CreateCategory />}
          {selectedTab === "Products" && <CreateProduct />}
          {selectedTab === "Users" && <Users />}
        </div>
      </div>
      <div className="Mobile-view-only">Only Available in Desktop View</div>
    </Layout>
  );
};

export default AdminDashboard;
