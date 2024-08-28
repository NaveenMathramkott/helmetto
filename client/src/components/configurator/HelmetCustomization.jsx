import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import Loader from "../loader/Loader";
import Experience from "./Experience";
import { CustomizationProvider } from "../../context/Customization";
import "./customStyles.css";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/cartProvider";

const HelmetCustomization = () => {
  const location = useLocation();
  const { setCustomCart } = useCart();
  useEffect(() => {
    if (location?.state) setCustomCart(location?.state);
    localStorage.setItem("customCart", JSON.stringify(location?.state));
  }, []);

  const { progress } = useProgress();
  const [appOnLive, setAppOnLive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress === 100) {
        setAppOnLive(true);
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <CustomizationProvider>
      {appOnLive ? <Experience /> : <Loader />}
    </CustomizationProvider>
  );
};

export default HelmetCustomization;
