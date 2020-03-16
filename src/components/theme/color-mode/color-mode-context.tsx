import React, { useState, useContext } from "react";

export const DEFAULT_COLOR_MODE_VALUE = "default";
export const ColorModeContext = React.createContext<{
  colorMode: string;
  setColorMode: (colorMode: string) => void;
}>({
  colorMode: DEFAULT_COLOR_MODE_VALUE,
  setColorMode: () => {},
});

export type IColorModeProps = React.PropsWithChildren<{
  defaultColorMode?: string;
}>;

export const ColorModeProvider = (props: IColorModeProps) => {
  const { children, defaultColorMode = DEFAULT_COLOR_MODE_VALUE } = props;
  const [colorMode, setColorMode] = useState(defaultColorMode);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const { colorMode, setColorMode } = useContext(ColorModeContext);
  return [colorMode, setColorMode] as const;
};
