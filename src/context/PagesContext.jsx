import React, { createContext, useState } from 'react';

const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const [myPage, setPage] = useState(1);

  const updatePages = (item) => {
    setPage(item);
  };

  return (
    <PagesContext.Provider value={{ myPage, updatePages }}>
      {children}
    </PagesContext.Provider>
  );
};

export { PagesContext };
