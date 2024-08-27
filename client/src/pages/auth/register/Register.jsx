import React, { useState } from "react";
import Layout from "../../../components/layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authProvider";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuShieldQuestion } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";

import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
        {
          name,
          password,
          email,
          admin: isAdmin,
          answer,
          address,
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
      } else {
        toast.error(res.data.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Layout title={`Register Ecommerce app`}>
        <div className="login-mainWrapper">
          <form onSubmit={handleSubmit}>
            <h3>REGISTER</h3>
            <div className="input-group">
              <label htmlFor="inputName">Name</label>
              <div className="icon-btn">
                <CgProfile color="black" />
                <input
                  type="text"
                  value={name}
                  placeholder="John Deo"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputEmail">Email address</label>
              <div className="icon-btn">
                <MdOutlineEmail color="black" />
                <input
                  type="email"
                  aria-describedby="emailHelp"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="inputPassword">Password</label>
              <div className="icon-btn">
                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <CiUnlock /> : <CiLock />}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="input-group" className="form-label">
                Address
              </label>
              <div className="icon-btn">
                <FaRegAddressCard color="black" />
                <input
                  type="text"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="input-group" className="form-label">
                What is your favorite sport?
              </label>
              <div className="icon-btn">
                <LuShieldQuestion color="black" />
                <input
                  type="text"
                  placeholder="football"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="adminCheck"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="adminCheck">
                Admin?
              </label>
            </div> */}
            <div className="btn-group">
              <button
                type="submit"
                id={`${
                  !name || !password || !email || !answer || !address
                    ? "btn-login-disable"
                    : "btn-login"
                }`}
                disabled={!name || !password || !email || !answer || !address}
              >
                Register
              </button>
              <span id="register-button">
                Already have an account?
                <button onClick={() => navigate("/login")}>Login</button>
              </span>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
