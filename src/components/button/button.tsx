/** @jsx jsx */
import { ReactChild, SFC } from "react";
import { CSSObject } from "@emotion/core";
import { jsx } from "theme-ui";
import { IIconComponentType } from "@fedlinker/font-awesome/lib/generateIcon";
import { textColor, darken, transparentize } from "../utils/colors";

enum EButtonType {
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
  giant = "giant",
  large = "large",
  medium = "medium",
  small = "small",
  tiny = "tiny",
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
  css?: CSSObject;

  /**
   * button size.
   * number means what the px is.
   */
  size?: IButtonSizeKey | number;

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
}

const Button: SFC<IButtonProps> = props => {
  const {
    css: cssProp,
    type,
    loading,
    onClick,
    icon: IconComponent,
    children,
  } = props;
  const handleClick = () => {
    if (loading || !onClick) {
      return;
    }
    onClick();
  };

  return (
    <button
      sx={{
        backgroundColor: type,
        fontSize: 2,
        fontFamily: "body",
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
        paddingBottom: 2,
        outline: "none",
        borderRadius: "4px",
        transition: "all 0.3s",
        border: "none",
        cursor: "pointer",
        color: textColor(type!),
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: transparentize(type!, 0.382),
        },
        "&:focus": {
          backgroundColor: darken(type!, 0.07),
          boxShadow: t => `0 0 0 3px ${transparentize(type!, 0.5)(t)}`,
        },
        "&:active": {
          backgroundColor: darken(type!, 0.15),
        },
        ...(cssProp || {}),
      }}
      onClick={handleClick}
    >
      {IconComponent ? <IconComponent style={{ marginRight: "3px" }} /> : null}
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "light",
  size: "medium",
};

export default Button;
