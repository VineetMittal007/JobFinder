// NOTE ENTIRE THEME FEATURE IS NOT USED ANYWHERE IN THE PROJECT 
import React, { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";

// Define ThemeContext Type
type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// Create ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    Appearance.getColorScheme() || "light"
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
