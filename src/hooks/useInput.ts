import { useState } from "react";

function useInput(defaultValue: any, target: string = "value") {
  const [value, setValue] = useState(defaultValue);
  let handleValueChange = null;

  if (target == "value") {
    handleValueChange = (event: any) => {
      if (event == "") {
        return setValue(defaultValue);
      }
      return setValue(event.target.value);
    };
  }

  if (target == "innerHTML") {
    handleValueChange = (event: any) => {
      if (event == "") {
        return setValue(defaultValue);
      }
      return setValue(event.target.innerHTML);
    };
  }

  if (target == "files") {
    handleValueChange = (event: any) => {
      if (event == "") {
        return setValue(defaultValue);
      }
      return setValue({
        blob: event.target.files[0],
        imageLink: URL.createObjectURL(event.target.files[0]),
      });
    };
  }

  return [value, handleValueChange];
}

export default useInput;
