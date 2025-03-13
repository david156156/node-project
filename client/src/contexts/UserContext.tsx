// src/contexts/UserContext.tsx
import { createContext, useState, ReactNode, useContext } from "react";
import { Token } from "../interfaces/User";

interface UserContextType {
  userId: string | null;
  token: string | null;
  user: Token | null;
  setUserId: (id: string | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: Token | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<Token | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        token,
        user,
        setUserId,
        setToken: handleSetToken,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
