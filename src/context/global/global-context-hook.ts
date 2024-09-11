import { useContext } from "react";
import { GlobalContext } from "./global-context";

export const useGlobalContext = function () {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Context should be used within a global context");
  }

  return context;
};
