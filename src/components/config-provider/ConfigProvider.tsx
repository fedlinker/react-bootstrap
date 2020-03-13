import React, { useState, useCallback } from "react";
import { ThemeProvider } from "../theme/theme-provider";
import { ITheme, DEFAULT_THEME } from "../theme/default-theme";
import { ConfigContext, IConfig } from "./ConfigContext";

export interface IConfigProviderProps {
  config?: Partial<IConfig>;
  children?: React.ReactNode;
}

export const ConfigProvider: React.SFC<IConfigProviderProps> = function(props) {
  const { children, config: configProp } = props;
  const [config, changeConfig] = useState<IConfig>({
    theme: {
      ...DEFAULT_THEME,
      ...(configProp!.theme || {}),
    } as ITheme,
  });

  const setConfig = useCallback(
    (c: Partial<IConfig>) => {
      changeConfig({ ...config, ...c });
    },
    [config]
  );

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <ThemeProvider theme={config.theme}>{children}</ThemeProvider>
    </ConfigContext.Provider>
  );
};

ConfigProvider.defaultProps = {
  config: {},
};
