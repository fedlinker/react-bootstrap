import React from "react";
import { ITheme, DEFAULT_THEME } from "./default-theme";

export const ThemeContext = React.createContext<ITheme>(DEFAULT_THEME);
