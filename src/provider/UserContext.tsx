/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
