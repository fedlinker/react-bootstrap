import { css, SystemStyleObject } from "@styled-system/css";
import { Interpolation } from "../index";
import mapValues from "lodash/mapValues";

export const getCss = (style: SystemStyleObject) => {
  return css(style) as Interpolation;
};

export interface IStylesObject {
  [key: string]: SystemStyleObject;
}

export const getStyles = <T extends IStylesObject = IStylesObject>(
  styles: T
): { [key in keyof T]: Interpolation } => {
  return mapValues(styles, o => {
    return getCss(o);
  });
};
