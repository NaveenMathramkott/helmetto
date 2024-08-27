import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/forgot-password`,
      {
        email,
        answer,
        newPassword,
      }
    );
    toast.success(res.data.message);
    navigate("/login");
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h3>FORGOT PASSWORD</h3>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputAnswer" className="form-label">
              What is your favorite Sport?
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAnswer"
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Create New Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
