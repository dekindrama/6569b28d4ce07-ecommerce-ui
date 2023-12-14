"use client";
import { Provider } from "react-redux";
import store from "@/states";

const Providers = ({ children }: any) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
