import { useState } from "react";

function useInput(defaultValue: any, target: string = "value") {
  const [value, setValue] = useState(defaultValue);
  let handleValueReset = (value?: any) => {
    if (value) {
      return setValue(value);
    }
    return setValue(defaultValue);
  };
  let handleValueChange = null;

  if (target == "value") {
    handleValueChange = (event: any) => {
      if (event == "") {
        return setValue(defaultValue);
      }
      return setValue(event.target.value);
    };
  }

  if (target == "checked") {
    handleValueChange = (event: any) => {
      if (event == "") {
        return setValue(defaultValue);
      }
      return setValue(event.target.checked);
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

  return [value, handleValueChange, handleValueReset];
}

export default useInput;
