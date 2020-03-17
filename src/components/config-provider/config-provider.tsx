import React, { useState, useCallback, useMemo, useEffect } from "react";
import { ThemeProvider } from "../theme/theme-provider";
import { ITheme, DEFAULT_THEME } from "../theme/default-theme";
import { ConfigContext, IConfig } from "./config-context";
import {
  ColorModeProvider,
  useColorMode,
  IColorModeProps,
  DEFAULT_COLOR_MODE_VALUE,
} from "../theme/color-mode/color-mode-context";
import { IColorMode } from "../theme";

export interface IConfigBaseProps {
  config?: Partial<IConfig>;
  children?: React.ReactNode;
}

export const ConfigBase: React.SFC<IConfigBaseProps> = function(props) {
  const { children, config: configProp } = props;
  const [colorMode] = useColorMode();
  const colors = useMemo(() => {
    const { modes: defaultModes, ...restDefaultColor } = DEFAULT_THEME.colors;
    const defaultColors = {
      ...restDefaultColor,
      ...(configProp?.theme?.colors || {}),
    };
    return {
      [DEFAULT_COLOR_MODE_VALUE]: defaultColors,
      ...(configProp?.theme?.colors.modes || {}),
      ...(defaultModes || {}),
    } as { [key: string]: IColorMode };
  }, [configProp]);

  const [config, changeConfig] = useState<IConfig>({
    theme: {
      ...DEFAULT_THEME,
      ...(configProp!.theme || {}),
      colors: colors[colorMode] || DEFAULT_THEME.colors,
    },
  });

  const setConfig = useCallback(
    (c: Partial<IConfig>) => {
      changeConfig({ ...config, ...c });
    },
    [config]
  );

  useEffect(() => {
    changeConfig({
      ...config,
      theme: {
        ...config.theme,
        colors: colors[colorMode] || DEFAULT_THEME.colors,
      },
    });
  }, [colors, colorMode]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <ThemeProvider theme={config.theme as ITheme}>{children}</ThemeProvider>
    </ConfigContext.Provider>
  );
};

export type IConfigProviderProps = IConfigBaseProps & IColorModeProps;

export const ConfigProvider: React.SFC<IConfigProviderProps> = props => {
  const { defaultColorMode, ...configProps } = props;
  return (
    <ColorModeProvider defaultColorMode={defaultColorMode}>
      <ConfigBase {...configProps} />
    </ColorModeProvider>
  );
};

ConfigBase.defaultProps = {
  config: {},
};
