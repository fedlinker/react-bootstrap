import {
  darken,
  lighten,
  adjustHue,
  setHue,
  setSaturation,
  setLightness,
  desaturate,
  saturate,
  shade,
  tint,
  transparentize,
  rgba,
  mix,
  complement,
  invert,
  parseToRgb,
} from "polished";
import { get } from "@styled-system/css";
import { BASE_COLORS, ITheme } from "../theme";

const g = (t: ITheme, c: string) => {
  return get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, "")
    .replace(/\)/, "");
};

export const darkenTheme = (c: string, n: number) => (t: object) =>
  darken(n, g(t, c));
export const lightenTheme = (c: string, n: number) => (t: object) =>
  lighten(n, g(t, c));
export const rotateTheme = (c: string, d: number) => (t: object) =>
  adjustHue(d, g(t, c));

export const hueTheme = (c: string, h: number) => (t: object) =>
  setHue(h, g(t, c));
export const saturationTheme = (c: string, s: number | string) => (t: object) =>
  setSaturation(s, g(t, c));
export const lightnessTheme = (c: string, l: string | number) => (t: object) =>
  setLightness(l, g(t, c));

export const desaturateTheme = (c: string, n: number) => (t: object) =>
  desaturate(n, g(t, c));
export const saturateTheme = (c: string, n: number) => (t: object) =>
  saturate(n, g(t, c));

export const shadeTheme = (c: string, n: number) => (t: object) =>
  shade(n, g(t, c));
export const tintTheme = (c: string, n: number) => (t: object) =>
  tint(n, g(t, c));

export const transparentizeTheme = (c: string, n: number) => (t: object) =>
  transparentize(n, g(t, c));
export const alphaTheme = (c: string, n: number) => (t: object) =>
  rgba(g(t, c), n);

export const mixTheme = (a: string, b: string, n = 0.5) => (t: object) =>
  mix(n, g(t, a), g(t, b));

export const complementTheme = (c: string) => (t: object) => {
  return complement(g(t, c));
};
export const invertTheme = (c: string) => (t: object) => invert(g(t, c));

export const grayscaleTheme = (c: string, n: number) => desaturateTheme(c, 1);

/**
 * get the text color of the theme color type
 * @param color theme color type
 */
export const textColorTheme = (color: string) => (t: object) => {
  return textColor(g(t, color));
};

export const textColor = (color: string) => {
  const { red, green, blue } = parseToRgb(color);
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;
  if (yiq >= 150) {
    return BASE_COLORS.gray900;
  } else {
    return BASE_COLORS.white;
  }
};
