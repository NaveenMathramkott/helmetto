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
import CustomLoader from "./CustomLoader";
import CustomBackgroundShader from "./Shader";
import Header from "../layouts/Header";
import CartButton from "./CartButton";
import { Toaster } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { FiDroplet, FiX, FiEye, FiRotateCcw } from "react-icons/fi";

const Experience = () => {
  const sceneRef = useRef();
  const { selectedMeshes, setCoverColor, coverColor } = useCustomization();

  const [showTooltip, setShowTooltip] = useState(false);
  const [clickedMesh, setClickedMesh] = useState(null);
  const [openConfigurator, setOpenConfigurator] = useState(false);
  const [openColorPalette, setOpenColorPalette] = useState(false);

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
          dpr={[1, 2]}
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
            polar={[-Math.PI / 4, Math.PI / 4]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <Suspense fallback={<CustomLoader />}>
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

        {/* Header Overlay */}
        <div className="fixed top-0 left-0 right-0 z-60">
          <Header />
        </div>

        {/* Color Palette Dialog */}
        <Dialog open={openColorPalette} onOpenChange={setOpenColorPalette}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm border-gray-700 text-white hover:bg-gray-800 rounded-full p-3 shadow-xl"
            >
              <FiDroplet className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm bg-gray-900 border-gray-700 p-4 overflow-hidden">
            <DialogHeader className="pb-4 border-b border-gray-700">
              <DialogTitle className="text-lg font-semibold text-white flex items-center justify-between">
                <FiDroplet className="h-4 w-4 text-teal-400 mr-2" />
                Helmet Colors
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setOpenColorPalette(false)}
                >
                  <FiX className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-sm mt-1">
                Select a color for the outer helmet shell
              </DialogDescription>
            </DialogHeader>

            <div className="p-4">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {colorPallete.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500 relative"
                    style={{
                      backgroundColor: item.color,
                      borderColor:
                        coverColor === item.color ? "white" : "transparent",
                      boxShadow:
                        coverColor === item.color
                          ? "0 0 0 2px white, 0 0 12px rgba(20, 184, 166, 0.5)"
                          : "none",
                    }}
                    onClick={() => {
                      setCoverColor(item.color);
                      setOpenColorPalette(false);
                    }}
                    aria-label={item.name}
                  >
                    {coverColor === item.color && (
                      <FiEye className="h-5 w-5 text-white drop-shadow-lg" />
                    )}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-gray-700">
                <span className="text-xs text-gray-400 flex-1">
                  Current:{" "}
                  {colorPallete.find((c) => c.color === coverColor)?.name ||
                    "Custom"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setCoverColor("#0a1828");
                    setOpenColorPalette(false);
                  }}
                >
                  <FiRotateCcw className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cart Button */}
        <div className="fixed top-24 right-4 z-60">
          <CartButton />
        </div>

        {/* Bottom Footer */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <p className="text-xs text-gray-400 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
            Click on helmet parts to configure
          </p>
        </div>

        {/* Configurator Dialog */}
        {openConfigurator && (
          <Configurator
            open={openConfigurator}
            onOpenChange={setOpenConfigurator}
            selectedMesh={selectedCustomMesh}
            handleCancel={() => onMeshClickFunction(null)}
          />
        )}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Experience;
