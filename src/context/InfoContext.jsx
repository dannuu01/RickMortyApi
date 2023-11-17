import { createContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [myInfo, setInfo] = useState([]);

  const updateInfo = (item) => {
    setInfo(item);
  };

  return (
    <InfoContext.Provider value={{ myInfo, updateInfo }}>
      {children}
    </InfoContext.Provider>
  );
};

export { InfoProvider, InfoContext };
