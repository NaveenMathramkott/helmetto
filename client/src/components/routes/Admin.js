import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { useAuth } from "../../context/authProvider";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const authCheck = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/admin-auth`, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((result) => result)
      .catch((error) => error);

    if (res?.data?.success) {
      setOk(true);
    } else {
      setOk(false);
    }
  };
  useEffect(() => {
    if (auth?.token) authCheck();
  }, [auth]);
  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
