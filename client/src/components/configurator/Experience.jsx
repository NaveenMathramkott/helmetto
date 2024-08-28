import {
  PresentationControls,
  RandomizedLight,
  Stage,
} from "@react-three/drei";
import Helmet from "./Helmet";
import { Suspense, useRef, useState } from "react";
import CameraControls from "../../utils/CameraControls";
import { Canvas } from "@react-three/fiber";
import Configurator from "./Configurator";
import * as THREE from "three";
import { useCustomization } from "../../context/Customization";
import { colorPallete } from "../../context/data";
import MouseCircleText from "./MouseCircleText";
import Loader from "./CustomLoader";
import CustomBackgroundShader from "./Shader";
import Header from "../layouts/Header";
import CartButton from "./CartButton";
import { Toaster } from "react-hot-toast";

const Experience = () => {
  const sceneRef = useRef();
  const { selectedMeshes, setCoverColor } = useCustomization();

  const [showTooltip, setShowTooltip] = useState(false);

  const [clickedMesh, setClickedMesh] = useState(null);
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [openColorPallete, setOpenColorPallete] = useState(false);

  // to disable the controls after focusing mesh
  const [disableControl, setDisableControl] = useState(true);

  // to avoid the multiple click after focusing mesh click
  const [meshClickOnce, setMeshClickOnce] = useState(false);

  //for getting mesh camera position
  const [selectedMeshCamera, setSelectedMeshCamera] = useState(null);

  //for getting custom mesh data
  const [selectedCustomMesh, setSelectedCustomMesh] = useState(null);

  const onMeshClickFunction = (event, selectedMesh) => {
    if (event === null) {
      setOpenConfigurator(false);
      setClickedMesh(null);
      setSelectedMeshCamera(setCameraPositionsFnc(null));
      setSelectedCustomMesh(null);

      setDisableControl(true);
      setMeshClickOnce(false);
    } else if (!meshClickOnce) {
      setOpenConfigurator(true);
      setMeshClickOnce(true);
      event.stopPropagation();
      const mesh = event.object;

      // Store the selected mesh in state
      setClickedMesh(mesh);
      setDisableControl(false);
      setSelectedCustomMesh(selectedMesh);

      setSelectedMeshCamera(setCameraPositionsFnc(selectedMesh.cameraPosition));
    }
  };

  const setCameraPositionsFnc = (position) => {
    if (position) {
      return new THREE.Vector3(position[0], position[1], position[2]);
    }
    return null;
  };

  return (
    <>
      <div className="app-MainWrapper">
        <Canvas
          drp={[1, 2]}
          camera={{ position: [0, 0, 3], fov: 35 }}
          style={{ touchAction: "none" }}
        >
          <CameraControls
            clickedMesh={clickedMesh}
            sceneRef={sceneRef}
            manualCameraPosition={selectedMeshCamera}
          />
          <CustomBackgroundShader />

          <PresentationControls
            enabled={disableControl}
            speed={1.5}
            global
            polar={[-Math.PI / 4, Math.PI / 4]} // Allow half rotation on the vertical axis (both positive and negative)
            rotation={[0, Math.PI / 2, 0]} // Initial rotation
          >
            <Suspense fallback={<Loader />}>
              <Stage environment="city" intensity={0.6} castShadow={false}>
                <RandomizedLight
                  castShadow
                  amount={1}
                  frames={10}
                  position={[5, 5, -1]}
                  ambient={10}
                />
                <Helmet
                  onMeshClick={onMeshClickFunction}
                  sceneRef={sceneRef}
                  onShowToolTipFunc={(event) => setShowTooltip(event)}
                />
              </Stage>
            </Suspense>
          </PresentationControls>
        </Canvas>
        {showTooltip && <MouseCircleText />}
        <div className="customHeader-mainWrapper">
          <Header />
        </div>

        <div className="color-selector-btn">
          {!openColorPallete && (
            <button onClick={() => setOpenColorPallete(true)}>Theme</button>
          )}
        </div>
        {openColorPallete && (
          <div
            className={`color-content ${
              openColorPallete ? "move-up" : "move-down"
            }`}
          >
            <>
              {colorPallete.map((item) => (
                <div
                  key={item.name}
                  className="color-selector"
                  style={{ backgroundColor: `${item.color}` }}
                  onClick={() => setCoverColor(item.color)}
                />
              ))}
            </>

            <button onClick={() => setOpenColorPallete(false)}>X</button>
          </div>
        )}
        <div className="app-headerContainer">
          <CartButton />
        </div>
        <div className="bottom-footer">
          Click on Helmet to configure - Created with love by Amouxtek
        </div>
        {openConfigurator && (
          <Configurator
            handleCancel={() => onMeshClickFunction(null)}
            selectedMesh={selectedCustomMesh}
          />
        )}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Experience;
