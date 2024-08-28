import { useEffect, useState } from "react";
import { useCustomization } from "../../context/Customization";
import { configOptions } from "../../context/data";

const Configurator = ({ handleCancel, selectedMesh, getCustomParts }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    customMeshId,
    setCustomMeshId,
    setCustomSelect,
    customSelect,
    customParts,
    setCustomParts,
  } = useCustomization();
  const [options, setOptions] = useState({});
  const [opt, setOpt] = useState("choose your items");

  useEffect(() => {
    configOptions.forEach((item) => {
      item.data.forEach((innerItem) => {
        if (innerItem.meshName.includes(selectedMesh.id)) {
          customSelect.map((data) => {
            if (data.type === item.type) {
              setOpt(data.selected);
            }
          });
          setOptions(item);
          return;
        }
      });
    });
  }, [selectedMesh]);

  const handleChange = (item) => {
    const newBaseId = item.meshName.split("-")[0];
    setOpt(item.name);
    setCustomSelect((prevCustomSelect) => {
      const existingIndex = prevCustomSelect.findIndex(
        (item) => item.type === options.type
      );

      if (existingIndex !== -1) {
        // If the type already exists, update the selected value
        const updatedSelect = [...prevCustomSelect];
        updatedSelect[existingIndex].selected = item.name;
        return updatedSelect;
      } else {
        // If the type doesn't exist, add the new type and selected value
        return [
          ...prevCustomSelect,
          { type: options.type, selected: item.name },
        ];
      }
    });

    setCustomParts((prevCustomProducts) => {
      const existingIndex = prevCustomProducts.findIndex(
        (item) => item.type === options.type
      );

      if (existingIndex !== -1) {
        // If the type already exists, update the selected value
        const updatedProducts = [...prevCustomProducts];
        updatedProducts[existingIndex] = {
          ...updatedProducts[existingIndex],
          name: item.name,
          price: item.price,
          type: options.type,
        };
        // setCustomProducts(updatedProducts);
        return updatedProducts;
      } else {
        // adding new product index will negative
        const newProduct = {
          name: item.name,
          price: item.price,
          type: options.type,
        };
        return [...prevCustomProducts, newProduct];
      }
    });

    const updatedIds = customMeshId.map((id) => {
      const baseId = id.split("-")[0];
      if (baseId === newBaseId) {
        // Replace the similar ID with the new ID
        return item.meshName;
      }
      return id;
    });
    setCustomMeshId(updatedIds);
  };

  return (
    <div className="configurator-mainWrapper">
      <div className="configurator">
        <h1 className="title">Choose {options.type}</h1>
        <div className="config-section">
          <label htmlFor="product-dropdown" className="label">
            Choose Product
          </label>
          <button
            id="product-dropdown"
            className="dropdown"
            onClick={() => setShowModal(!showModal)}
          >
            {opt}
          </button>
          {showModal && (
            <div className="modal-custom" id="modal-custom">
              <div className="modal-content">
                {options?.data?.map((item, index) => (
                  <ul
                    key={`${index}-01`}
                    value={item.meshName}
                    onClick={() => handleChange(item)}
                  >
                    {`${item.name}  ${item.price ? `- ₹ ${item.price}` : " "}`}
                  </ul>
                ))}
              </div>
              <button
                className="btn-close-modal"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>

        <div className="config-section btn-section">
          {/* <button
            className="btn-cancel"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button> */}
          <button
            className="btn-save"
            onClick={() => {
              handleCancel();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
