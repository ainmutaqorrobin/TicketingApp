import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUserState = () => useContext(UserContext);

export function UserProvider({ initialUser, children }) {
  const [currentUser, setCurrentUser] = useState(initialUser || null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
