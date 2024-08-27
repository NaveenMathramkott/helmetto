import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, path, location]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ minHeight: "80vh" }}
      >
        <div>You are redirecting in {count} seconds...</div>
        <div className="spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
