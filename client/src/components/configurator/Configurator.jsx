import { useEffect, useState } from "react";
import { useCustomization } from "../../context/Customization";
import { configOptions } from "../../context/data";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";

const Configurator = ({ handleCancel, selectedMesh, getCustomParts }) => {
  const {
    customMeshId,
    setCustomMeshId,
    setCustomSelect,
    customSelect,
    customParts,
    setCustomParts,
  } = useCustomization();
  const [options, setOptions] = useState({});
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (!selectedMesh) return;

    configOptions.forEach((item) => {
      item.data.forEach((innerItem) => {
        if (innerItem.meshName.includes(selectedMesh.id)) {
          const existingSelect = customSelect.find(
            (data) => data.type === item.type,
          );
          if (existingSelect) {
            setSelectedItem(existingSelect.selected);
          }
          setOptions(item);
        }
      });
    });
  }, [selectedMesh, customSelect]);

  const handleChange = (item) => {
    const newBaseId = item.meshName.split("-")[0];
    setSelectedItem(item.name);

    setCustomSelect((prevCustomSelect) => {
      const existingIndex = prevCustomSelect.findIndex(
        (data) => data.type === options.type,
      );

      if (existingIndex !== -1) {
        const updatedSelect = [...prevCustomSelect];
        updatedSelect[existingIndex].selected = item.name;
        return updatedSelect;
      } else {
        return [
          ...prevCustomSelect,
          { type: options.type, selected: item.name },
        ];
      }
    });

    setCustomParts((prevCustomProducts) => {
      const existingIndex = prevCustomProducts.findIndex(
        (product) => product.type === options.type,
      );

      if (existingIndex !== -1) {
        const updatedProducts = [...prevCustomProducts];
        updatedProducts[existingIndex] = {
          ...updatedProducts[existingIndex],
          name: item.name,
          price: item.price,
          type: options.type,
        };
        return updatedProducts;
      } else {
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
        return item.meshName;
      }
      return id;
    });
    setCustomMeshId(updatedIds);
  };

  if (!selectedMesh || !options.type) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={() => handleCancel && handleCancel()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" onClick={() => {}}>
          <Label className="font-medium text-sm mb-1 block">
            Choose {options.type}
          </Label>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[80vh] bg-gray-900 border-gray-700 p-4 overflow-hidden">
        <DialogHeader className="pb-4 border-b border-gray-700">
          <DialogTitle className="text-lg font-semibold text-white">
            Select {options.type}
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm mt-1">
            Choose from available options. Price updates in real-time.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4">
          <Select
            value={selectedItem}
            onValueChange={(value) => {
              const item = options.data.find((d) => d.name === value);
              if (item) handleChange(item);
            }}
          >
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent
              className="bg-gray-900 border-gray-700"
              position="popper"
            >
              {options.data?.map((item) => (
                <SelectItem
                  key={item.meshName}
                  value={item.name}
                  className="text-white focus:bg-gray-800"
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{item.name}</span>
                    {item.price && (
                      <span className="text-sm text-teal-400 font-semibold">
                        +₹ {item.price}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className=" border-gray-700" />

        <DialogFooter className=" ">
          <Button
            variant="outline"
            className="flex-1 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => handleCancel && handleCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            onClick={() => handleCancel && handleCancel()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Configurator;
