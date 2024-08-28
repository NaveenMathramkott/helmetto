import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const MouseCircleText = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="tooltip"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="none"
          id="circlePath"
          d="
      M 10, 50
      a 40,40 0 1,1 80,0
      40,40 0 1,1 -80,0
    "
          color="transparent"
        />
        <text
          fontFamily="monospace"
          fontSize="12"
          fontWeight="bold"
          fill="#fff"
        >
          <textPath
            href="#circlePath"
            textLength={Math.floor(Math.PI * 2 * 38)}
          >
            Click to edit ❆ Click to edit ❆
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default MouseCircleText;
