export enum EThemeType {
  primary = "primary",
  success = "success",
  warning = "warning",
  danger = "danger",
  info = "info",
  light = "light",
  dark = "dark",
}

export type IThemeType = keyof typeof EThemeType;
