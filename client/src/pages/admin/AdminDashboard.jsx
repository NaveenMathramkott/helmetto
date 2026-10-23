import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import Users from "./Users";
import { Card, CardContent } from "../../components/ui/card";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("orders");

  const tabs = [
    { value: "orders", label: "Orders", component: <OrderList /> },
    { value: "categories", label: "Categories", component: <CreateCategory /> },
    { value: "products", label: "Products", component: <CreateProduct /> },
    { value: "users", label: "Users", component: <Users /> },
  ];

  return (
    <Layout title={`Admin Panel - Helmetto`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <AdminMenu active={selectedTab} onClick={setSelectedTab} />
          </div>
          <div className="flex-1 min-w-0">
            {tabs.map((tab) => (
              <div
                key={tab.value}
                className={selectedTab === tab.value ? "block" : "hidden"}
              >
                <Card>
                  <CardContent className="pt-0">{tab.component}</CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden mt-6">
          <AdminMenu active={selectedTab} onClick={setSelectedTab} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
