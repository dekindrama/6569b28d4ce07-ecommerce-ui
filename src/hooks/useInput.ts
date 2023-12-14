import { useState } from "react";

function useInput(defaultValue: any, target: string = "value") {
  const [value, setValue] = useState(defaultValue);
  let handleValueChange = (event: any) => setValue(event.target.value);
  if (target == "innerHTML") {
    handleValueChange = (event: any) => setValue(event.target.innerHTML);
  }

  return [value, handleValueChange];
}

export default useInput;
