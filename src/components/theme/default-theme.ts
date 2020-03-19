import { Theme } from "styled-system";
import { DEFAULT_COLOR_MODE, IColorsType } from "./color-mode";

export interface ITheme extends Omit<Theme, "colors"> {
  colors: IColorsType;
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
  colors: DEFAULT_COLOR_MODE,
  zIndices: {},
};
