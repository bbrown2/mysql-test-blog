import { createContext, useState } from "react";

export const StatusBarContext = createContext();

export const StatusBarContextProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <StatusBarContext.Provider value={{ handleMessage, message }}>
      {children}
    </StatusBarContext.Provider>
  );
};
