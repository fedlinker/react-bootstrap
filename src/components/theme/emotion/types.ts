import { ITheme } from "../default-theme";

declare module "@emotion/react" {
  export interface Theme extends ITheme {}
}
