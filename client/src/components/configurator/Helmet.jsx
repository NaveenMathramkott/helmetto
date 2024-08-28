import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useCustomization } from "../../context/Customization";
import { configMesh } from "../../context/data";

const Helmet = ({ onMeshClick, sceneRef, onShowToolTipFunc, ...props }) => {
  const { nodes, materials } = useGLTF("/models/helmet.glb");
  const { customMeshId, coverColor } = useCustomization();
  const [selectedMeshes, setSelectedMeshes] = useState([]);

  const handlePointerOver = (material) => {
    if (onShowToolTipFunc) onShowToolTipFunc(true);
    const mesh = material.object;

    // Store the original color and emissive intensity (only once, if not already stored)
    if (!mesh.userData.originalColor) {
      mesh.userData.originalColor = mesh.material.color.getHex();
    }
    if (!mesh.userData.originalEmissive) {
      mesh.userData.originalEmissive = mesh.material.emissive.getHex();
    }
    if (!mesh.userData.originalEmissiveIntensity) {
      mesh.userData.originalEmissiveIntensity = mesh.material.emissiveIntensity;
    }

    // Set new hover colors and emissive properties
    mesh.material.color.set(0x808080);
    mesh.material.emissive.set(0x808080); // Set emissive to the same color
    mesh.material.emissiveIntensity = 2;
  };

  const handlePointerOut = (material) => {
    if (onShowToolTipFunc) onShowToolTipFunc(false);

    const mesh = material.object;

    // Restore the original color and emissive properties
    mesh.material.color.setHex(mesh.userData.originalColor); // Fix typo: 'orginalColor' -> 'originalColor'
    mesh.material.emissive.setHex(mesh.userData.originalEmissive); // Fix issue: previously used emissive intensity
    mesh.material.emissiveIntensity = mesh.userData.originalEmissiveIntensity;
  };

  const MESHES_DATA = [
    {
      id: "Glass",
      geometry: nodes.Glass.geometry,
      material: materials.Glass_cover,
      position: [-0.001, 0.28, -0.345],
    },

    {
      id: "SliderOut",
      geometry: nodes["Slider-out"].geometry,
      material: materials.cover,
      position: [-0.001, -0.095, 0.425],
    },

    {
      id: "BackShield",
      geometry: nodes.Back_shield.geometry,
      material: materials["Back-shield"],
      position: [-0.001, -0.042, 0.657],
    },
    {
      id: "GlassGuard",
      geometry: nodes["Glass-guard"].geometry,
      material: materials["Glass-guard"],
      position: [-0.001, 0.274, -0.193],
    },

    {
      id: "MouthGuard",
      geometry: nodes["Mouth-guard"].geometry,
      material: materials["Mouth-guard"],
      position: [-0.001, -0.027, -0.709],
    },

    {
      id: "BackPlate",
      geometry: nodes["Back-plate"].geometry,
      material: materials["Back-plate"],
      position: [-0.001, 0.457, 0.727],
    },

    {
      id: "UnderGuard",
      geometry: nodes.Under_guard.geometry,
      material: materials["Under-guard"],
      position: [-0.001, -0.305, -0.081],
    },

    {
      id: "InnerCloth",
      geometry: nodes.Inner_cloth.geometry,
      material: materials["Inner-cloth"],
      position: [-0.001, 0.082, 0.099],
    },

    {
      id: "Glass001",
      geometry: nodes.Glass001.geometry,
      material: materials["Glass_cover.001"],
      position: [0, 0.288, -0.329],
    },

    {
      id: "OuterCover",
      geometry: nodes.Outer_cover.geometry,
      material: materials.cover,
      position: [-0.001, 0.323, 0.152],
    },
    {
      id: "LightMoutLight",
      geometry: nodes["LightMout-light"].geometry,
      material: materials["LightMount-cover"],
      position: [-0.003, 0.207, 0.869],
    },
    {
      id: "LightMoutLightLed",
      geometry: nodes["LightMout-light-led"].geometry,
      material: materials["LightMount-light-led"],
      position: [-0.003, 0.207, 0.874],
    },
    {
      id: "bluetooth",
      geometry: nodes.bluetooth.geometry,
      material: materials.Bluetooth,
      position: [-0.494, -0.161, -0.262],
      // cameraPosition: [-1, 0, 1],
    },
    {
      id: "bluetooth-01",
      geometry: nodes["bluetooth-01"].geometry,
      material: materials["Bluetooth-01"],
      position: [-0.487, -0.173, -0.281],
      // cameraPosition: [-1, 0, 1],
    },
    {
      id: "bluetooth-none",
      geometry: nodes["bluetooth-none"].geometry,
      material: materials["Bluetooth-none"],
      position: [-0.433, -0.173, -0.281],
      // cameraPosition: [-1, 0, 1],
    },

    {
      id: "TopVent",
      geometry: nodes["Top-vent"].geometry,
      material: materials["Top-vent"],
      position: [-0.001, 0.757, 0.27],
    },
    {
      id: "TopVent-02",
      geometry: nodes["Top-vent-02"].geometry,
      material: materials["Top-vent-02"],
      position: [-0.002, 0.774, 0.041],
    },
    {
      id: "TopVent-none",
      geometry: nodes["Top-vent-none"].geometry,
      material: materials["Top-vent-none"],
      position: [-0.001, 0.757, 0.27],
    },
    {
      id: "Holder",
      geometry: nodes.holder.geometry,
      material: materials.holder,
      position: [0.001, -0.265, -0.755],
    },
    {
      id: "Holder-none",
      geometry: nodes["holder-none"].geometry,
      material: materials["holder.001"],
      position: [0.002, -0.239, -0.721],
    },
  ];

  useEffect(() => {
    const filteredMeshes = [];

    customMeshId?.forEach((item) => {
      const data = MESHES_DATA.filter((innerItem) => innerItem.id === item);
      filteredMeshes.push(...data); // Accumulate the results
    });

    setSelectedMeshes(filteredMeshes); // Set state with all accumulated data
  }, [customMeshId]);

  return (
    <>
      <group
        {...props}
        scale={0.7}
        ref={sceneRef}
        dispose={null}
        position={[0, -0.2, 0]}
      >
        {selectedMeshes?.map((mesh, index) => {
          return (
            <mesh
              key={`${mesh.geometry}-${index}`}
              geometry={mesh.geometry}
              material={mesh.material}
              position={mesh.position}
              rotation={mesh.rotation}
              material-color={mesh.id === "OuterCover" && coverColor}
              onClick={(event) => {
                if (configMesh.includes(mesh.id)) {
                  onMeshClick(event, mesh);
                }
              }}
              onPointerOver={(event) => {
                if (configMesh.includes(mesh.id)) {
                  handlePointerOver(event);
                }
              }}
              onPointerOut={(event) => {
                if (configMesh.includes(mesh.id)) {
                  handlePointerOut(event);
                }
              }}
            />
          );
        })}
      </group>
    </>
  );
};

useGLTF.preload("/models/helmet.glb");

export default Helmet;
