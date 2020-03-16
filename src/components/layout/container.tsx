/** @jsx jsx */
import React, { useMemo } from "react";
import { JustifyContentProperty } from "csstype";
import { Interpolation, jsx, getCss } from "../theme";

export type IContainerProps = React.PropsWithChildren<{
  /**
   * whether the container is responsive.
   * fuild === true: the container is not responsive.
   */
  fluid?: boolean;
  align?: JustifyContentProperty;
  style?: Interpolation;
}>;

export const Container: React.SFC<IContainerProps> = props => {
  const { children, style = {}, fluid, align } = props;

  const baseStyles = useMemo(() => {
    return getCss({
      width: "100%",
      paddingRight: "15px",
      paddingLeft: "15px",
      boxSizing: "border-box",
      maxWidth:
        fluid === true
          ? undefined
          : ["100%", "540px", "720px", "960px", "1140px"],
    });
  }, [fluid]);

  return (
    <div css={{ justifyContent: align, display: "flex" }}>
      <div css={[baseStyles, style]}>{children}</div>
    </div>
  );
};

Container.defaultProps = {
  fluid: false,
  align: "center",
};
