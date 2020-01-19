import React, { PropsWithChildren, useState, useCallback } from "react";
import { ThemeProvider, Theme, ColorMode } from "theme-ui";
import { ConfigContext, DEFAULT_THEME, IConfig } from "./ConfigContext";

export interface IConfigProviderProps {
  config?: IConfig;
}

export default function ConfigProvider(
  props: PropsWithChildren<IConfigProviderProps>
) {
  const { children, config: configProp } = props;
  const [config, changeConfig] = useState<IConfig>({
    theme: {
      ...DEFAULT_THEME,
      ...(configProp ? configProp.theme : {}),
    } as Theme,
  });

  const setConfig = useCallback(
    (c: IConfig) => {
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
}
