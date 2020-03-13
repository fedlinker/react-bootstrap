import { SystemStyleObject } from "@styled-system/css";
import { Interpolation } from "../index";
import { useMemo } from "react";
import mapValues from "lodash/mapValues";
import { getCss } from "./use-css";

export function useStyles<T extends { [key: string]: SystemStyleObject }>(
  styles: T
): { [P in keyof T]: Interpolation } {
  const s = useMemo(() => {
    return mapValues(styles, o => {
      return getCss(o);
    });
  }, [styles]);
  return s;
}
