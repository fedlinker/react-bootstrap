import { SxStyleProp, Theme } from "theme-ui";

const heading: SxStyleProp = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const BASE_COLORS = {
  white: "#fff",
  gray100: "#f8f9fa",
  gray200: "#e9ecef",
  gray300: "#dee2e6",
  gray400: "#ced4da",
  gray500: "#adb5bd",
  gray600: "#6c757d",
  gray700: "#495057",
  gray800: "#343a40",
  gray900: "#212529",
  black: "#000",
  blue: "#007bff",
  indigo: "#6610f2",
  purple: "#6f42c1",
  pink: "#e83e8c",
  red: "#dc3545",
  orange: "#fd7e14",
  yellow: "#ffc107",
  green: "#28a745",
  teal: "#20c997",
  cyan: "#17a2b8",
};

export const theme: Theme = {
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  // base font-size is 16px, index is 2.
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    lighter: "lighter",
    light: 300,
    body: 400,
    heading: 700,
    bold: 700,
    bolder: "bolder",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#222b45",
    background: "#fff",
    primary: BASE_COLORS.blue,
    secondary: BASE_COLORS.gray600,
    success: BASE_COLORS.green,
    warning: BASE_COLORS.yellow,
    danger: BASE_COLORS.red,
    info: BASE_COLORS.cyan,
    light: BASE_COLORS.gray100,
    dark: BASE_COLORS.gray800,
    shadow: BASE_COLORS.gray200,
    border: BASE_COLORS.gray200,
    modes: {
      dark: {
        text: "#fff",
        background: "#192038",
        primary: BASE_COLORS.blue,
        secondary: BASE_COLORS.gray600,
        success: BASE_COLORS.green,
        warning: BASE_COLORS.yellow,
        danger: BASE_COLORS.red,
        info: BASE_COLORS.cyan,
        light: BASE_COLORS.gray100,
        dark: BASE_COLORS.gray800,
        shadow: BASE_COLORS.gray900,
        border: BASE_COLORS.cyan,
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    div: {
      color: "text",
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "primary",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
};
