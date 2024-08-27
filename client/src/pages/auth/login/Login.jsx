import React, { useState } from "react";
import Layout from "../../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/authProvider";
import "./style.css";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
        {
          password,
          email,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(`${location?.state ? location.state : "/"}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(`Login user not found`);
    }
  };
  return (
    <>
      <Layout title={`Login Ecommerce app`}>
        <div className="login-mainWrapper">
          <form onSubmit={handleSubmit}>
            <h3>LOGIN</h3>
            <div className="input-group">
              <label htmlFor="inputEmail">Email address</label>
              <div className="icon-btn">
                <MdOutlineEmail color="black" />
                <input
                  type="email"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                />
              </div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="icon-btn">
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <CiUnlock /> : <CiLock />}
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
            </div>
            <div className="btn-group">
              <button
                type="submit"
                id={`${
                  !email || !password ? "btn-login-disable" : "btn-login"
                }`}
                disabled={!email || !password}
              >
                Login
              </button>
              <button type="button" onClick={() => navigate("/forgotPassword")}>
                forgot password
              </button>
              <span id="register-button">
                Don't have an account?
                <button onClick={() => navigate("/register")}>Register</button>
              </span>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
