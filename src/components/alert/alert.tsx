/** @jsx jsx */
import React, { useMemo, FunctionComponent, useState, Fragment } from "react";
import { getCss, jsx } from "../theme";
import { themeColorLevel } from "../utils/colors";
import { FONT_WEIGHT_BOLD } from "../theme/constant";
import { animated, useTransition } from "react-spring";
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
  const buttonStyles = useMemo(
    () =>
      getCss({
        position: "absolute",
        top: "0",
        right: "0",
        color: "inherit",
        border: 0,
        backgroundColor: "transparent",
        float: "right",
        fontSize: 4,
        fontWeight: "700",
        lineHeight: "1",
        opacity: ".5",
        "&:hover": {
          opacity: ".75",
          cursor: "pointer",
        },
      }),
    []
  );
  const closeStyles = useMemo(
    () =>
      getCss({
        position: "absolute",
        top: "0",
        right: "0",
        padding: ".75rem 1.25rem",
        color: "inherit",
      }),
    []
  );
  return (
    <button onClick={props.onClick} css={[buttonStyles]}>
      <span css={[closeStyles]}>{"×"} </span>
    </button>
  );
};

export const Alert: FunctionComponent<IAlertProps> = props => {
  const [hide, setHide] = useState(false);
  const { type, children, dismissible } = props;
  const baseStyles = useMemo(
    () =>
      getCss({
        position: "relative",
        padding: ".75rem 1.25rem",
        marginBottom: 2,
        border: "1px solid transparent",
        borderRadius: t => `${t.radii.default}`,
      }),
    []
  );
  const customStylesByType = useMemo(() => {
    return getCss({
      backgroundColor: themeColorLevel(type, ALERT_BG_LEVEL),
      borderColor: themeColorLevel(type, ALERT_BORDER_LEVEL),
      color: themeColorLevel(type, ALERT_COLOR_LEVEL),
    });
  }, [type]);
  const transitions = useTransition(hide, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <Fragment>
      {transitions.map(
        ({ item, key, props }) =>
          !item && (
            <animated.div
              key={key}
              style={props}
              css={[baseStyles, customStylesByType]}
            >
              {children}
              {dismissible && (
                <CloseButton
                  onClick={() => {
                    setHide(true);
                  }}
                />
              )}
            </animated.div>
          )
      )}
    </Fragment>
  );
};

export const AlertLink: FunctionComponent<IAlertLinkProps> = props => {
  const { children } = props;
  const baseStyles = useMemo(() => {
    return getCss({
      fontWeight: FONT_WEIGHT_BOLD,
    });
  }, [children]);

  return <a css={[baseStyles]}>{children} </a>;
};
