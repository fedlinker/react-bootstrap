import React, { createContext, useContext } from "react";
import { ITheme, DEFAULT_THEME, IColorsType } from "../theme";

export interface IConfig {
  theme: Omit<ITheme, "colors"> & { colors: Partial<IColorsType> };
}
export type IConfigSetFunc = (config: Partial<IConfig>) => any;
export type IConfigThemeSetFunc = (theme: Partial<ITheme>) => any;
export interface IConfigContext {
  config: IConfig;
  setConfig: IConfigSetFunc;
}

export const ConfigContext = createContext<IConfigContext>({
  config: {
    theme: DEFAULT_THEME,
  },
  setConfig: () => null,
});

/**
 * config context hooks
 */
export const useConfig = (): [IConfig, IConfigSetFunc] => {
  const { config, setConfig } = useContext(ConfigContext);
  return [config, setConfig];
};

/**
 * HOC to inject config context value
 * @param Comp component
 */
export const withConfig = <P extends IConfigContext>(
  Comp: React.ComponentType<P>
) => {
  return (props: P) => {
    const [config, setConfig] = useConfig();
    return <Comp config={config} setConfig={setConfig} {...props} />;
  };
};
