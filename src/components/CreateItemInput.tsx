import useInput from "@/hooks/useInput";
import Button from "./Button";
import Image from "./Image";

const CreateItemInput = ({ onCreate }: { onCreate: any }) => {
  const [name, setName] = useInput("");
  const [stock, setStock] = useInput(0);
  const [picture, setPicture] = useInput("", "files");
  const [unit, setUnit] = useInput("");
  const [unitPrice, setUnitPrice] = useInput(0);

  function onCreateHandler() {
    onCreate({
      name,
      stock,
      picture: picture.blob,
      unit,
      unitPrice,
    });

    setName("");
    setStock(0);
    setPicture("");
    setUnit("");
    setUnitPrice(0);
  }

  return (
    <div className="flex max-w-md flex-col">
      <input
        className="border-2 border-black"
        type="text"
        name="name"
        value={name}
        onChange={setName}
        placeholder="input name ..."
        required
      />
      <input
        className="border-2 border-black"
        type="number"
        name="stock"
        value={stock}
        onChange={setStock}
        placeholder="input stock ..."
        required
      />
      <Image
        src={picture !== "" ? picture.imageLink : ""}
        alt="test image"
        className="w-100 h-100 object-cover"
      />
      <input
        className="border-2 border-black"
        type="file"
        name="picture"
        onChange={setPicture}
        required
      />
      <input
        className="border-2 border-black"
        type="text"
        name="unit"
        value={unit}
        onChange={setUnit}
        required
        placeholder="input unit ..."
      />
      <input
        className="border-2 border-black"
        type="number"
        name="unit_price"
        value={unitPrice}
        onChange={setUnitPrice}
        placeholder="input unit price ..."
        required
      />
      <Button onClick={onCreateHandler}>Create Item</Button>
    </div>
  );
};

export default CreateItemInput;
