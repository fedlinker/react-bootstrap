/** @jsx jsx */
import { useMemo, forwardRef } from "react";
import { SolidCircleNotch } from "@fedlinker/font-awesome";
import { jsx, Interpolation } from "../index";
import {
  textColorTheme,
  transparentizeTheme,
  darkenTheme,
} from "../utils/colors";
import { rotate } from "../utils/keyframes";
import { getCss } from "../theme";
import { ISizeType } from "../enum/size";

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
  size?: ISizeType;

  /**
   * button is disable or not.
   */
  disabled?: boolean;

  /**
   * text or react component in button.
   */
  children?: React.ReactNode;

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

export const Button = forwardRef<
  HTMLButtonElement | HTMLLinkElement,
  IButtonProps
>((props, ref) => {
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
    if (loading || !onClick || disabled) {
      return;
    }
    onClick();
  };

  const typeStyles: Interpolation = useMemo(() => {
    return getCss({
      backgroundColor: type,
      fontFamily: "body",
      color: textColorTheme(type!),
      ...(disabled || loading
        ? {}
        : {
            "&:hover": {
              backgroundColor: darkenTheme(type!, 0.07),
            },
            "&:focus": {
              backgroundColor: darkenTheme(type!, 0.1),
              boxShadow: t =>
                `0 0 0 ${t.radii.sm} ${transparentizeTheme(type!, 0.5)(t)}`,
            },
            "&:active": {
              backgroundColor: darkenTheme(type!, 0.15),
            },
          }),
    });
  }, [type]);

  const sizeStyles: Interpolation = useMemo(() => {
    const isSm = size === "sm";
    const isLg = size === "lg";
    return getCss({
      padding: isLg ? 4 : isSm ? 2 : 3,
      paddingTop: isLg ? 2 : isSm ? 1 : 2,
      paddingBottom: isLg ? 2 : isSm ? 1 : 2,
      fontSize: isLg ? 3 : isSm ? 1 : 2,
    });
  }, [size]);

  const disabledStyles: Interpolation = useMemo(() => {
    return getCss(
      disabled
        ? {
            opacity: 0.65,
            cursor: "not-allowed",
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
    return getCss(
      loading
        ? {
            opacity: 0.65,
            cursor: "progress",
          }
        : {}
    );
  }, [loading]);

  const linkStyles = useMemo(() => {
    const backgroundColor = "rgba(0,0,0,0)";
    return link
      ? getCss({
          color: type,
          boxShadow: "none",
          backgroundColor,
          "&:hover": {
            backgroundColor,
            textDecoration: "underline",
            color: darkenTheme(type!, 0.075),
          },
          "&:focus": {
            backgroundColor,
            color: darkenTheme(type!, 0.1),
            boxShadow: "none",
          },
          "&:active": {
            backgroundColor,
            color: darkenTheme(type!, 0.15),
          },
        })
      : {};
  }, [link, type]);

  const outlineStyles = useMemo(() => {
    return outline && !link
      ? getCss({
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: type!,
          borderStyle: "solid",
          borderWidth: "1px",
          color: type!,
          ...(disabled || loading
            ? {}
            : {
                "&:hover": {
                  backgroundColor: type!,
                  color: textColorTheme(type!),
                },
                "&:focus": {
                  backgroundColor: type!,
                  color: textColorTheme(type!),
                },
                "&:active": {
                  backgroundColor: type!,
                },
              }),
        })
      : {};
  }, [outline, link, type, disabled]);

  const ElementType = useMemo(() => {
    return link ? "a" : "button";
  }, [link]);

  return (
    <ElementType
      ref={ref as any}
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
          verticalAlign: "middle",
        },
        typeStyles,
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
          css={{
            marginRight: "3px",
            animation: `${rotate} 1s linear infinite`,
          }}
        />
      ) : null}
      {children}
    </ElementType>
  );
});

Button.defaultProps = {
  type: "light",
  outline: false,
  size: "default",
};
