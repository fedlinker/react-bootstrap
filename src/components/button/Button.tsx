/** @jsx jsx */
import { ReactChild, SFC, useMemo } from "react";
import { SolidCircleNotch } from "@fedlinker/font-awesome";
import { jsx, Interpolation } from "../index";
import {
  textColorTheme,
  transparentizeTheme,
  darkenTheme,
} from "../utils/colors";
import { rotate } from "../utils/keyframes";
import { getCss } from "../theme/use-css";

export enum EButtonType {
  primary = "primary",
  success = "success",
  warning = "warning",
  danger = "danger",
  info = "info",
  light = "light",
  dark = "dark",
}
export type IButtonTypeKey = keyof typeof EButtonType;

enum EButtonSize {
  lg = "lg",
  sm = "sm",
}
export type IButtonSizeKey = keyof typeof EButtonSize;

export interface IButtonProps {
  /**
   * button type.
   */
  type?: IButtonTypeKey;

  /**
   * style of button wrapper.
   */
  style?: Interpolation;

  /**
   * button size.
   */
  size?: IButtonSizeKey;

  /**
   * button is disable or not.
   */
  disabled?: boolean;

  /**
   * text or react component in button.
   */
  children?: ReactChild;

  /**
   * button status is loading.
   */
  loading?: boolean;

  outline?: boolean;

  /**
   * handler of clicking button.
   */
  onClick?(): void;

  /**
   * whether the button's display property is block.
   */
  block?: boolean;

  /**
   * href prop of tag a
   */
  href?: string;

  /**
   * target prop of tag a
   */
  target?: string;

  link?: boolean;
}

export const Button: SFC<IButtonProps> = props => {
  const {
    style: cssProp,
    type,
    loading,
    onClick,
    children,
    size,
    disabled,
    block,
    href,
    target,
    outline,
    link,
  } = props;
  const handleClick = () => {
    if (loading || !onClick) {
      return;
    }
    onClick();
  };

  const sizeStyles: Interpolation = useMemo(() => {
    if (size == null) {
      return getCss({
        padding: 3,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 2,
      });
    }
    const isSm = size === "sm";
    return getCss({
      padding: isSm ? 2 : 4,
      paddingTop: isSm ? 1 : 2,
      paddingBottom: isSm ? 1 : 2,
      fontSize: isSm ? 1 : 3,
    });
  }, [size]);

  const disabledStyles: Interpolation = useMemo(() => {
    const backgroundColor = outline ? "" : type;
    return getCss(
      disabled
        ? {
            opacity: 0.65,
            cursor: "not-allowed",
            "&:hover": {
              backgroundColor,
            },
            "&:focus": {
              backgroundColor,
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor,
            },
          }
        : {}
    );
  }, [disabled, type, outline]);

  const blockStyles: Interpolation = useMemo(() => {
    return block
      ? {
          display: "flex",
          width: "100%",
        }
      : {};
  }, [block]);

  const loadingStyles: Interpolation = useMemo(() => {
    const backgroundColor = outline ? "" : type;
    return getCss(
      loading
        ? {
            opacity: 0.65,
            cursor: "progress",
            "&:hover": {
              backgroundColor,
            },
            "&:focus": {
              backgroundColor,
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor,
            },
          }
        : {}
    );
  }, [loading]);

  const linkStyles = useMemo(() => {
    const backgroundColor = "rgba(0,0,0,0)";
    const color = "primary";
    return link
      ? getCss({
          color,
          boxShadow: "none",
          backgroundColor,
          "&:hover": {
            backgroundColor,
            textDecoration: "underline",
            color: darkenTheme(color, 0.075),
          },
          "&:focus": {
            backgroundColor,
            color: darkenTheme(color, 0.1),
            boxShadow: "none",
          },
          "&:active": {
            backgroundColor,
            color: darkenTheme(color, 0.15),
          },
        })
      : {};
  }, [link]);

  const outlineStyles = useMemo(() => {
    return outline && !link
      ? ({
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: type!,
          borderStyle: "solid",
          borderWidth: "1px",
          color: type!,
          "&:hover": {
            backgroundColor: type!,
            color: type!,
          },
          "&:focus": {
            // backgroundColor: type!,
            color: type!,
            // boxShadow: t => `0 0 0 3px ${transparentizeTheme(type!, 0.5)(t)}`,
          },
          "&:active": {
            backgroundColor: type!,
          },
        } as Interpolation)
      : {};
  }, [outline, link, type]);

  const ElementType = useMemo(() => {
    return link ? "a" : "button";
  }, [link]);

  return (
    <ElementType
      href={link ? href : undefined}
      target={link ? target : undefined}
      css={[
        {
          display: "inline-flex",
          position: "relative",
          alignItems: "center",
          outline: "none",
          borderRadius: "4px",
          transition: "all 0.3s",
          border: "none",
          cursor: "pointer",
          justifyContent: "center",
        },
        getCss({
          backgroundColor: type,
          fontFamily: "body",
          color: textColorTheme(type!),
          "&:hover": {
            backgroundColor: darkenTheme(type!, 0.07),
          },
          "&:focus": {
            backgroundColor: darkenTheme(type!, 0.1),
            boxShadow: t => `0 0 0 3px ${transparentizeTheme(type!, 0.5)(t)}`,
          },
          "&:active": {
            backgroundColor: darkenTheme(type!, 0.15),
          },
        }),
        sizeStyles,
        blockStyles,
        linkStyles,
        outlineStyles,
        cssProp || {},
        loadingStyles,
        disabledStyles,
      ]}
      onClick={handleClick}
    >
      {loading ? (
        <SolidCircleNotch
          sx={{
            marginRight: "3px",
            animation: `${rotate} 1s linear infinite`,
          }}
        />
      ) : null}
      {children}
    </ElementType>
  );
};

Button.defaultProps = {
  type: "light",
  outline: false,
};
