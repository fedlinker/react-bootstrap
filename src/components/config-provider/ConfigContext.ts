import { createContext } from "react";
import { theme } from "./theme";
import { Theme } from "theme-ui";

export interface IConfig {
  theme: Theme;
}

export interface IConfigContext {
  config: IConfig;
  setConfig(config: Partial<IConfig>): any;
}

export const ConfigContext = createContext<IConfigContext>({
  config: {
    theme,
  },
  setConfig: () => null,
});
