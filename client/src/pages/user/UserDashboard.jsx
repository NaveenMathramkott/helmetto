import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/authProvider";
import UserMenu from "./UserMenu";
import Orders from "./Orders";
import Profile from "./Profile";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";

const UserDashboard = () => {
  const [auth] = useAuth();
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState(
    location?.state?.dashboard ? location?.state?.dashboard : "orders",
  );

  return (
    <Layout title={"User Dashboard - Helmetto"}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {auth?.user?.name}
          </p>
        </div>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <UserMenu active={selectedTab} onClick={setSelectedTab} />
          </div>
          <div className="flex-1 min-w-0">
            {selectedTab === "orders" && (
              <Card>
                <CardContent className="pt-0">
                  <Orders />
                </CardContent>
              </Card>
            )}
            {selectedTab === "profile" && (
              <Card>
                <CardContent className="pt-0">
                  <Profile redirect={location?.state?.profile} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="lg:hidden mt-6">
          <UserMenu active={selectedTab} onClick={setSelectedTab} />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
