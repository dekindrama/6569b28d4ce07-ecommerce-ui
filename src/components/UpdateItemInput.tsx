import useInput from "@/hooks/useInput";
import Button from "./Button";
import Image from "./Image";

const UpdateItemInput = ({ onUpdate, item }: { onUpdate: any; item: any }) => {
  const [name, setName, resetName] = useInput(item.name);
  const [stock, setStock, resetStock] = useInput(item.stock);
  const [picture, setPicture, resetPicture] = useInput("", "files");
  const [unit, setUnit, resetUnit] = useInput(item.unit);
  const [unitPrice, setUnitPrice, resetUnitPrice] = useInput(item.unit_price);

  function onUpdateHandler() {
    onUpdate({
      id: item.id,
      name,
      stock,
      picture: picture.blob,
      unit,
      unitPrice,
    });

    resetName();
    resetStock();
    resetPicture();
    resetUnit();
    resetUnitPrice();
  }

  //* set image preview link
  let imagePreviewLink = "";
  if (picture) {
    imagePreviewLink = picture.imageLink;
  } else if (item) {
    imagePreviewLink = item.picture;
  }

  //* render component
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
        src={imagePreviewLink}
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
      <Button onClick={onUpdateHandler}>Update Item</Button>
    </div>
  );
};

export default UpdateItemInput;
