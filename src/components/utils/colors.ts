import * as P from "polished";
import { get } from "@styled-system/css";

const g = (t: object, c: string) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, "")
    .replace(/\)/, "");

export const darken = (c: string, n: number) => (t: object) =>
  P.darken(n, g(t, c));
export const lighten = (c: string, n: number) => (t: object) =>
  P.lighten(n, g(t, c));
export const rotate = (c: string, d: number) => (t: object) =>
  P.adjustHue(d, g(t, c));

export const hue = (c: string, h: number) => (t: object) =>
  P.setHue(h, g(t, c));
export const saturation = (c: string, s: number | string) => (t: object) =>
  P.setSaturation(s, g(t, c));
export const lightness = (c: string, l: string | number) => (t: object) =>
  P.setLightness(l, g(t, c));

export const desaturate = (c: string, n: number) => (t: object) =>
  P.desaturate(n, g(t, c));
export const saturate = (c: string, n: number) => (t: object) =>
  P.saturate(n, g(t, c));

export const shade = (c: string, n: number) => (t: object) =>
  P.shade(n, g(t, c));
export const tint = (c: string, n: number) => (t: object) => P.tint(n, g(t, c));

export const transparentize = (c: string, n: number) => (t: object) =>
  P.transparentize(n, g(t, c));
export const alpha = (c: string, n: number) => (t: object) =>
  P.rgba(g(t, c), n);

export const mix = (a: string, b: string, n = 0.5) => (t: object) =>
  P.mix(n, g(t, a), g(t, b));

export const complement = (c: string) => (t: object) => P.complement(g(t, c));
export const invert = (c: string) => (t: object) => P.invert(g(t, c));

export const grayscale = (c: string, n: number) => desaturate(c, 1);
export const textColor = (color: string, ratio: number = 0.618) => (
  t: object
) => {
  const luminance = P.getLuminance(g(t, color));
  if (luminance > ratio) {
    return "#000";
  } else {
    return "#fff";
  }
};
