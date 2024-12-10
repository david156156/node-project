import { createContext, useState, ReactNode, useContext } from "react";
import { Card } from "../interfaces/Card";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
