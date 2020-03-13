import { useContext } from "react";
import { ThemeContext } from "./theme-context";
import { DEFAULT_THEME } from "./default-theme";

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme && theme.colors ? theme : DEFAULT_THEME;
};
