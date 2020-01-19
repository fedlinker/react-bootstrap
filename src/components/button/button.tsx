/** @jsx jsx */
import { ReactChild, SFC, useMemo } from "react";
import { CSSObject } from "@emotion/core";
import { jsx, SxStyleProp } from "theme-ui";
import { SolidCircleNotch } from "@fedlinker/font-awesome";
import { IIconComponentType } from "@fedlinker/font-awesome/lib/generateIcon";
import { textColor, darken, transparentize } from "../utils/colors";
import { rotate } from "../utils/keyframes";

enum EButtonType {
  primary = "primary",
  success = "success",
  warning = "warning",
  danger = "danger",
  info = "info",
  light = "light",
  dark = "dark",
  link = "link",
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
  style?: CSSObject;

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

  /**
   * handler of clicking button.
   */
  onClick?(): void;

  icon?: IIconComponentType;

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
}

export const Button: SFC<IButtonProps> = props => {
  const {
    style: cssProp,
    type,
    loading,
    onClick,
    icon: IconComponent,
    children,
    size,
    disabled,
    block,
    href,
    target,
  } = props;
  const handleClick = () => {
    if (loading || !onClick) {
      return;
    }
    onClick();
  };

  const isLink = useMemo(() => {
    return type === "link";
  }, [type]);

  const sizeStyles: SxStyleProp = useMemo(() => {
    if (size == null) {
      return {
        padding: 3,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 2,
      };
    }
    const isSm = size === "sm";
    return {
      padding: isSm ? 2 : 4,
      paddingTop: isSm ? 1 : 2,
      paddingBottom: isSm ? 1 : 2,
      fontSize: isSm ? 1 : 3,
    } as SxStyleProp;
  }, [size]);

  const disabledStyles: SxStyleProp = useMemo(() => {
    return disabled
      ? {
          opacity: 0.65,
          cursor: "not-allowed",
          "&:hover": {
            backgroundColor: type,
          },
          "&:focus": {
            backgroundColor: type,
            boxShadow: "none",
          },
          "&:active": {
            backgroundColor: type,
          },
        }
      : {};
  }, [disabled, type]);

  const blockStyles: SxStyleProp = useMemo(() => {
    return block
      ? {
          display: "flex",
          width: "100%",
        }
      : {};
  }, [block]);

  const loadingStyles: SxStyleProp = useMemo(() => {
    return loading ? { opacity: 0.65, cursor: "progress" } : {};
  }, [loading]);

  const linkStyles = useMemo(() => {
    const backgroundColor = "rgba(0,0,0,0)";
    const color = "primary";
    return isLink
      ? ({
          color,
          boxShadow: "none",
          backgroundColor,
          "&:hover": {
            backgroundColor,
            textDecoration: "underline",
            color: darken(color, 0.075),
          },
          "&:focus": {
            backgroundColor,
            color: darken(color, 0.1),
            boxShadow: "none",
          },
          "&:active": {
            backgroundColor,
            color: darken(color, 0.15),
          },
        } as SxStyleProp)
      : {};
  }, [isLink]);

  const ElementType = useMemo(() => {
    return isLink ? "a" : "button";
  }, [isLink]);

  return (
    <ElementType
      href={isLink ? href : undefined}
      target={isLink ? target : undefined}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: type,
        fontFamily: "body",
        outline: "none",
        borderRadius: "4px",
        transition: "all 0.3s",
        border: "none",
        cursor: "pointer",
        color: textColor(type!),
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: darken(type!, 0.07),
        },
        "&:focus": {
          backgroundColor: darken(type!, 0.1),
          boxShadow: t => `0 0 0 3px ${transparentize(type!, 0.5)(t)}`,
        },
        "&:active": {
          backgroundColor: darken(type!, 0.15),
        },
        ...sizeStyles,
        ...blockStyles,
        ...linkStyles,
        ...(cssProp || {}),
        ...loadingStyles,
        ...disabledStyles,
      }}
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
      {IconComponent ? <IconComponent style={{ marginRight: "3px" }} /> : null}
      <div sx={{ flex: 1 }}>{children}</div>
    </ElementType>
  );
};

Button.defaultProps = {
  type: "light",
};
