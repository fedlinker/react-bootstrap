import React, { useState, useCallback } from "react";
import { ThemeProvider, Theme, ColorMode } from "theme-ui";
import { ConfigContext, IConfig } from "./ConfigContext";
import { theme } from "./theme";

export interface IConfigProviderProps {
  config?: Partial<IConfig>;
  children?: React.ReactNode;
}

export const ConfigProvider: React.SFC<IConfigProviderProps> = function(props) {
  const { children, config: configProp } = props;
  const [config, changeConfig] = useState<IConfig>({
    theme: {
      ...theme,
      ...(configProp!.theme || {}),
    } as Theme,
  });

  const setConfig = useCallback(
    (c: Partial<IConfig>) => {
      changeConfig({ ...config, ...c });
    },
    [config]
  );

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <ThemeProvider<Theme> theme={config.theme}>
        <ColorMode />
        {children}
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};

ConfigProvider.defaultProps = {
  config: {},
};
