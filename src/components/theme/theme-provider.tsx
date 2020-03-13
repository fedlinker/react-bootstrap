import React, { useMemo } from "react";
import { ITheme, DEFAULT_THEME } from "./default-theme";
import { useTheme } from "./use-theme";
import { ThemeContext } from "./theme-context";

export function ThemeProvider(
  props: React.PropsWithChildren<{ theme: ITheme }>
) {
  const { children, theme: themeProp } = props;
  const parentTheme = useTheme();

  const theme = useMemo(() => {
    return { ...DEFAULT_THEME, ...themeProp };
  }, [themeProp, parentTheme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
