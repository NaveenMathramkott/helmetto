import { Html } from "@react-three/drei";
import "./customStyles.css";

const CustomLoader = () => {
  return (
    <Html center>
      <div className="loading-container">
        <div className="loading-spinner"> </div>
      </div>
    </Html>
  );
};

export default CustomLoader;
