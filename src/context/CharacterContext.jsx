// En un archivo llamado Context.js
import React, { createContext, useState } from "react";

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {
  const [myCharacters, setCharacters] = useState([]);

  const updateCharacters = (item) => {
    setCharacters(item);
  };

  return (
    <CharacterContext.Provider
      value={{
        myCharacters,
        updateCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterProvider, CharacterContext };
