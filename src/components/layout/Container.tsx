/** @jsx jsx */
import React from "react";
import { jsx, SxStyleProp } from "theme-ui";

export type IContainerProps = React.PropsWithChildren<{
  /**
   * whether the container is responsive.
   * fuild === true: the container is not responsive.
   */
  fluid?: boolean;
  style?: SxStyleProp;
}>;

export const Container: React.SFC<IContainerProps> = props => {
  const { children, style = {}, fluid } = props;
  return (
    <div
      sx={{
        width: "100%",
        paddingRight: "15px",
        paddingLeft: "15px",
        maxWidth:
          fluid === true
            ? undefined
            : ["100%", "540px", "720px", "960px", "1140px"],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

Container.defaultProps = {
  fluid: false,
};
