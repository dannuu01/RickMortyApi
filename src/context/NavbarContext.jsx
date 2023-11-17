// En un archivo llamado Context.js
import React, { createContext, useState } from 'react';

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Daniel GH');

  const updateTitle = (newTitle) => {
    setPageTitle(newTitle);
  };

  return (
    <NavbarContext.Provider value={{ pageTitle, updateTitle }}>
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarProvider, NavbarContext };
