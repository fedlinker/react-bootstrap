import React, { createContext, useContext, useCallback } from "react";
import { ITheme, DEFAULT_THEME } from "../theme";

export interface IConfig {
  theme: ITheme;
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
 * theme context hooks
 */
export const useTheme = (): [ITheme, IConfigThemeSetFunc] => {
  const [config, setConfig] = useConfig();
  const setTheme: IConfigThemeSetFunc = useCallback(
    (newTheme = {}) => {
      setConfig({
        ...config,
        theme: {
          ...config.theme,
          ...newTheme,
        },
      });
    },
    [config]
  );
  return [config.theme, setTheme];
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

/**
 * HOC to inject theme value
 * @param Comp
 */
export const withTheme = <
  P extends { theme: ITheme; setTheme: IConfigThemeSetFunc }
>(
  Comp: React.ComponentType<P>
) => {
  return (props: P) => {
    const [theme, setTheme] = useTheme();
    return <Comp theme={theme} setTheme={setTheme} {...props} />;
  };
};
