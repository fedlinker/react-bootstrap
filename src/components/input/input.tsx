/** @jsx jsx */
import React, { useMemo } from "react";
import { ISizeType, ESize } from "../enum/size";
import { getCss, jsx, Interpolation } from "../theme";
import { transparentize } from "polished";

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "style"> {
  size?: ISizeType;
  style?: Interpolation;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => {
    const { value, style, onChange, size, ...rest } = props;

    const baseStyles = useMemo(() => {
      return getCss({
        boxSizing: "border-box",
        outline: "none",
        border: "1px solid",
        borderColor: "inputBorder",
        color: "input",
        transition: "all 0.3s",
        backgroundColor: "background",
        lineHeight: "body",
        flex: 1,
        width: "100%",
        "::placeholder": {
          color: "placeholder",
        },
        "&:focus": {
          border: "1px solid",
          borderColor: "primary",
          boxShadow: t => `0 0 0 3px ${transparentize(0.5)(t.colors.primary)}`,
        },
      });
    }, []);

    const sizeStyles = useMemo(() => {
      const isSm = size === ESize.sm;
      const isLg = size === ESize.lg;
      const paddingTop = isLg ? 3 : isSm ? 1 : 2;
      const paddingLeft = isLg ? 5 : isSm ? 3 : 4;
      return getCss({
        paddingTop,
        paddingLeft,
        paddingBottom: paddingTop,
        paddingRight: paddingLeft,
        fontSize: isLg ? 3 : isSm ? 1 : 2,
        borderRadius: size,
      });
    }, [size]);

    return (
      <input
        css={[baseStyles, sizeStyles, style]}
        ref={ref}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

Input.defaultProps = {
  size: "default",
};
