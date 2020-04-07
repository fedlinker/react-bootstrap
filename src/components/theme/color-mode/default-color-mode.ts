import { BASE_COLORS } from "./colors";
import { darken } from "polished";

export interface IColorMode {
  /** text color */
  text: string;
  /** text muted */
  secondary: string;
  background: string;
  /** theme color */
  primary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  light: string;
  dark: string;

  border: string;
  /** text color of input */
  input: string;
  inputBorder: string;
  placeholder: string;
}

export type IColorsType = IColorMode & {
  modes?: {
    [key: string]: IColorMode;
  };
};

const dark = darken(0.1);

export const DEFAULT_COLOR_MODE: IColorsType = {
  text: BASE_COLORS.gray900,
  secondary: BASE_COLORS.gray600,
  background: BASE_COLORS.white,
  primary: BASE_COLORS.blue,
  success: BASE_COLORS.green,
  warning: BASE_COLORS.yellow,
  danger: BASE_COLORS.red,
  info: BASE_COLORS.cyan,
  light: BASE_COLORS.gray100,
  dark: BASE_COLORS.gray800,
  border: BASE_COLORS.gray300,
  input: BASE_COLORS.gray700,
  inputBorder: BASE_COLORS.gray400,
  placeholder: BASE_COLORS.gray600,
  modes: {
    dark: {
      text: BASE_COLORS.white,
      secondary: BASE_COLORS.gray600,
      background: BASE_COLORS.gray900,
      primary: dark(BASE_COLORS.blue),
      success: dark(BASE_COLORS.green),
      warning: dark(BASE_COLORS.orange),
      danger: dark(BASE_COLORS.red),
      info: dark(BASE_COLORS.cyan),
      light: dark(BASE_COLORS.gray100),
      dark: dark(BASE_COLORS.gray800),
      border: dark(BASE_COLORS.gray700),
      input: BASE_COLORS.gray700,
      inputBorder: dark(BASE_COLORS.gray400),
      placeholder: dark(BASE_COLORS.gray600),
    },
  },
};
