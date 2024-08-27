import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/authProvider";
import UserMenu from "./UserMenu";
import Orders from "./Orders";
import Profile from "./Profile";
import "./style.css";
import { useLocation } from "react-router-dom";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const [selectedTab, setSlelectedTab] = useState(
    location?.state?.dashboard ? location?.state?.dashboard : "Orders"
  );

  const setTabFunction = (event) => {
    setSlelectedTab(event.currentTarget.innerHTML);
  };
  return (
    <Layout title={"User-Dashboard-Emart"}>
      <div className="userPanel-mainWrapper">
        <div className="userPanel-leftSection">
          <UserMenu onClick={setTabFunction} active={selectedTab} />
        </div>
        <div className="userPanel-rightSection">
          {selectedTab === "Orders" && <Orders />}
          {selectedTab === "Profile" && (
            <Profile redirect={location?.state?.profile} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
