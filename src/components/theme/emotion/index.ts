import { Interpolation as EmotionInterpolation } from "@emotion/react";
import { ITheme } from "../default-theme";
import "./types";
export * from "./jsx";
export * from "./css";

export type Interpolation = EmotionInterpolation<ITheme>;
