/** @jsx jsx */
import React from "react";
import { SolidCircleNotch } from "@fedlinker/font-awesome";
import { ISizeType, IThemeType } from "../enum";
import { rotate, fadeScaleOut } from "../utils/keyframes";
import { jsx, getCss, Interpolation } from "../theme";

export enum ESpinnerType {
  border = "border",
  grow = "grow",
}
export type ISpinnerType = keyof typeof ESpinnerType;

export interface ISpinnerProps {
  type?: ISpinnerType;
  size?: ISizeType;
  children?: React.ReactNode;
  theme?: IThemeType;
  style?: Interpolation;
}

const GrowSpinnerIcon = (props: { theme: IThemeType }) => {
  const { theme } = props;
  return (
    <div
      css={getCss({
        animation: `${fadeScaleOut} 0.8s linear infinite`,
        display: "inline-block",
        width: "1em",
        height: "1em",
        borderRadius: "50%",
        backgroundColor: theme,
      })}
    />
  );
};

export const Spinner = React.forwardRef<HTMLDivElement, ISpinnerProps>(
  (props, ref) => {
    const { type, theme, size, style } = props;

    const sizeUnit = React.useMemo(() => {
      return size === "default" ? "1.5rem" : size === "lg" ? "3rem" : "1rem";
    }, [size]);

    return (
      <div
        ref={ref}
        css={[
          {
            position: "relative",
            fontSize: sizeUnit,
            display: "inline-block",
            width: sizeUnit,
            height: sizeUnit,
          },
          style,
        ]}
      >
        {type === "border" ? (
          <SolidCircleNotch
            css={getCss({
              animation: `${rotate} 1s linear infinite`,
              color: theme,
            })}
          />
        ) : (
          <GrowSpinnerIcon theme={theme!} />
        )}
      </div>
    );
  }
);

Spinner.defaultProps = {
  type: "border",
  size: "default",
  theme: "primary",
};
