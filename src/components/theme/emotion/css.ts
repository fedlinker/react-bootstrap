import { Interpolation, SerializedStyles } from "@emotion/react";
import { serializeStyles } from "@emotion/serialize";
import { ITheme } from "../default-theme";

export function css(...args: Array<Interpolation<ITheme>>): SerializedStyles {
  // @ts-ignore
  return serializeStyles(args);
}
