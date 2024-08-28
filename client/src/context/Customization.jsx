import { createContext, useContext, useEffect, useState } from "react";
import { colorPallete, configOptions, customMesh } from "./data";

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [cushionMaterial, setCushionMaterial] = useState("leather");
  const [backLed, setBackLed] = useState(1);
  const [innerVisor, setInnerVisor] = useState(1);
  const [bluetoothModule, setBlutoothModule] = useState(1);
  const [innerMeshColor, setInnerMeshColor] = useState(colorPallete[0]);
  const [customSelect, setCustomSelect] = useState([]);
  const [customMeshId, setCustomMeshId] = useState(customMesh);
  const [coverColor, setCoverColor] = useState(colorPallete[0].color);
  const [customParts, setCustomParts] = useState();

  useEffect(() => {
    setCustomMeshId(customMesh);
  }, []);

  useEffect(() => {
    const data = configOptions.map((item) => {
      const data = item.data[0];
      return { name: data.name, price: data.price, type: item.type };
    });
    setCustomParts(data);
  }, []);

  return (
    <CustomizationContext.Provider
      value={{
        cushionMaterial,
        backLed,
        innerVisor,
        bluetoothModule,
        innerMeshColor,
        customSelect,
        customMeshId,
        coverColor,
        customParts,
        setBackLed,
        setBlutoothModule,
        setCushionMaterial,
        setInnerMeshColor,
        setInnerVisor,
        setCustomSelect,
        setCustomMeshId,
        setCoverColor,
        setCustomParts,
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
