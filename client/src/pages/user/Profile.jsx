import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuShieldQuestion } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authProvider";

const Profile = ({ redirect }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobNumber, setMobNumber] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profile-update`,
        {
          name,
          password,
          email,
          address,
          phone: mobNumber,
          user: auth?.user,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res?.data?.token ? res?.data?.token : auth?.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
      navigate(`${redirect}` || "/");
    } catch (error) {
      toast.error(`error in update user`);
    }
  };

  return (
    <div className="user-profile-mainWrapper">
      <form onSubmit={handleSubmit}>
        <h3>Update Profile</h3>
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
          <label htmlFor="inputEmail" className="form-label">
            Home Address
          </label>
          <div className="icon-btn">
            <LuShieldQuestion color="black" />
            <input
              type="text"
              placeholder="Permenent Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="inputEmail" className="form-label">
            Phone Number
          </label>
          <div className="icon-btn">
            <LuShieldQuestion color="black" />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobNumber}
              onChange={(e) => setMobNumber(e.target.value)}
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
              !name || !password || !email || !mobNumber || !address
                ? "btn-login-disable"
                : "btn-login"
            }`}
            disabled={!name || !password || !email || !mobNumber || !address}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
