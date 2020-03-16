import { Theme } from "styled-system";
import { IColorMode, BASE_COLORS } from "./color-mode";

export interface ITheme extends Omit<Theme, "colors"> {
  colors: IColorMode & {
    modes?: {
      [key: string]: IColorMode;
    };
  };
}

/**
 * Extra small < 576px
 * Small < 768
 * Medium < 992px
 * Large < 1200px
 * Extra large ≥ 1200px
 */
const DEFAULT_BREAKPOINTS = ["576px", "768px", "992px", "1200px"];

export const DEFAULT_THEME: ITheme = {
  space: [
    "0rem",
    "0.25rem",
    "0.375rem",
    "0.5rem",
    "0.75rem",
    "1rem",
    "1.5rem",
    "3rem",
    "4rem",
    "5rem",
  ],
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    heading: "inherit",
    monospace:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  breakpoints: DEFAULT_BREAKPOINTS,
  // base font-size is 16px, index is 2.
  fontSizes: [
    "0.75rem",
    "0.875rem",
    "1rem", // base font-size
    "1.25rem",
    "1.5rem",
    "1.75rem",
    "2rem",
    "2.5rem",
    "3.5rem",
    "4.5rem",
    "5.5rem",
    "6rem",
  ],
  fontWeights: {
    lighter: "lighter",
    light: 300,
    body: 400,
    heading: 500,
    bold: 700,
    bolder: "bolder",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  // border-radius
  radii: {
    default: "0.25rem",
    sm: "0.2rem",
    lg: "0.3rem",
    pill: "50rem",
  },
  colors: {
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
        primary: BASE_COLORS.blue,
        success: BASE_COLORS.green,
        warning: BASE_COLORS.orange,
        danger: BASE_COLORS.red,
        info: BASE_COLORS.cyan,
        light: BASE_COLORS.gray100,
        dark: BASE_COLORS.gray800,
        border: BASE_COLORS.gray700,
        input: BASE_COLORS.gray700,
        inputBorder: BASE_COLORS.gray400,
        placeholder: BASE_COLORS.gray600,
      },
    },
  },
};
