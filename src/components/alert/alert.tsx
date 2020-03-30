/** @jsx jsx */
import React, { useMemo, SFC } from "react";
import { ISizeType, ESize } from "../enum/size";
import { getCss, jsx, Interpolation } from "../theme";
import { transparentize } from "polished";
import { themeColorLevel } from "../utils/colors";
import { CONSTANT } from "../theme";
import {
  ALERT_BG_LEVEL,
  ALERT_BORDER_LEVEL,
  ALERT_COLOR_LEVEL,
} from "./styleVariables";

export enum EAlertType {
  primary = "primary",
  secondary = "secondary",
  success = "success",
  warning = "warning",
  danger = "danger",
  info = "info",
  light = "light",
  dark = "dark",
}

export type IAlertTypeKey = keyof typeof EAlertType;

export interface IAlertProps extends IAlertLinkProps {
  type: string;
}

export interface IAlertLinkProps {
  children: React.ReactNode;
}

export const Alert: SFC<IAlertProps> = props => {
  const { type, children } = props;
  const baseStyles = useMemo(() => {
    return getCss({
      backgroundColor: themeColorLevel(type, ALERT_BG_LEVEL),
      borderColor: themeColorLevel(type, ALERT_BORDER_LEVEL),
      color: themeColorLevel(type, ALERT_COLOR_LEVEL),
      border: "1px solid transparent",
      lineHeight: "body",
      borderRadius: "4px",
      padding: "11px",
      margin: "10px",
    });
  }, []);
  return <div css={[baseStyles]}> {children} </div>;
};

export const AlertLink: SFC<IAlertLinkProps> = props => {
  const { children } = props;
  const baseStyles = useMemo(() => {
    return getCss({
      fontWeight: CONSTANT.FONT_WEIGHT_BOLD,
    });
  }, []);

  return <a css={[baseStyles]}>{children} </a>;
};
