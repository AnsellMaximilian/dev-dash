import { useContext } from "react";
import { DevContext } from "../context/dev/DevContext";

export const useDev = () => {
  const context = useContext(DevContext);
  if (!context) {
    throw new Error("useDev must be used within an DevProvider");
  }
  return context;
};
