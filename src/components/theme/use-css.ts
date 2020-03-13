import { css, SystemStyleObject } from "@styled-system/css";
import { Interpolation } from "../index";
import { useMemo } from "react";

export const getCss = (style: SystemStyleObject) => {
  return css(style) as Interpolation;
};

export function useCss(style: SystemStyleObject): Interpolation {
  const s = useMemo(() => {
    return getCss(style);
  }, [style]);
  return s;
}
