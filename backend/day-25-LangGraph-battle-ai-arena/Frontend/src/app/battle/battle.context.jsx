import React, { createContext, useState } from "react";

export const BattleContext = createContext();

export const BattleContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Standard camelCase
  const [error, setError] = useState(null);

  return (
    <BattleContext.Provider
      value={{ data, setData, isLoading, setIsLoading, error, setError }}
    >
      {children}
    </BattleContext.Provider>
  );
};
