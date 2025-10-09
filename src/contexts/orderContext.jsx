import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // state variables
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  
  // values to be provided in the context
  const value = {
    groomName,
    setGroomName,
    brideName,
    setBrideName,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}