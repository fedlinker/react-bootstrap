/** @jsx jsx */
import React, { useMemo, FunctionComponent, useState } from "react";
import { getCss, jsx } from "../theme";
import { themeColorLevel } from "../utils/colors";
import { CONSTANT } from "../theme";
import { fade as fadeStyles } from "../utils/animations";
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
  dismissible?: boolean;
}

export interface IAlertLinkProps {
  children: React.ReactNode;
}

export interface ICloseButtonProps {
  onClick: () => void;
}

const CloseButton: FunctionComponent<ICloseButtonProps> = props => {
  const buttonStyles = getCss({
    position: "absolute",
    top: "0",
    right: "0",
    padding: ".75rem 1.25rem",
    color: "inherit",
    border: 0,
    backgroundColor: "transparent",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "700",
    lineHeight: "1",
    opacity: ".5",
    "&:hover": {
      opacity: ".75",
      cursor: "pointer",
    },
  });
  const closeStyles = getCss({
    position: "absolute",
    top: "0",
    right: "0",
    padding: ".75rem 1.25rem",
    color: "inherit",
  });
  return (
    <button onClick={props.onClick} css={[buttonStyles]}>
      <span css={[closeStyles]}>{"×"} </span>
    </button>
  );
};

export const Alert: FunctionComponent<IAlertProps> = props => {
  const [hide, setHide] = useState(false);
  const { type, children, dismissible } = props;
  const baseStyles = getCss({
    position: "relative",
    padding: ".75rem 1.25rem",
    marginBottom: "1rem",
    border: "1px solid transparent",
    borderRadius: ".25rem",
  });
  const customStylesByType = useMemo(() => {
    return getCss({
      backgroundColor: themeColorLevel(type, ALERT_BG_LEVEL),
      borderColor: themeColorLevel(type, ALERT_BORDER_LEVEL),
      color: themeColorLevel(type, ALERT_COLOR_LEVEL),
    });
  }, [type]);

  return hide ? null : (
    <div css={[baseStyles, customStylesByType, dismissible && fadeStyles]}>
      {" "}
      {children}{" "}
      {dismissible && (
        <CloseButton
          onClick={() => {
            setHide(true);
          }}
        />
      )}
    </div>
  );
};

export const AlertLink: FunctionComponent<IAlertLinkProps> = props => {
  const { children } = props;
  const baseStyles = useMemo(() => {
    return getCss({
      fontWeight: CONSTANT.FONT_WEIGHT_BOLD,
    });
  }, [children]);

  return <a css={[baseStyles]}>{children} </a>;
};
