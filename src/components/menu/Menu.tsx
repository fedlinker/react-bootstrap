/** @jsx jsx */
import React, { SFC, useState } from "react";
import { jsx, getCss, Interpolation } from "../theme";
import { transparentizeTheme } from "../utils/colors";

export interface IMenuProps {
  style?: Interpolation;
  children?: React.ReactNode;
}

export const Menu: SFC<IMenuProps> = props => {
  const { style, children } = props;
  const [baseProps] = useState({ level: 0 });
  return (
    <div
      css={[
        getCss({
          display: "inline-block",
          color: "text",
          fontSize: 2,
          backgroundColor: "background",
          paddingTop: 2,
          paddingBottom: 2,
          border: "1px solid",
          borderColor: transparentizeTheme("text", 0.85),
          borderRadius: "default",
          minWidth: "10rem",
        }),
        style,
      ]}
    >
      {React.Children.map(children, (c, i) => {
        return React.cloneElement(c as React.ReactElement, {
          key: i,
          ...baseProps,
        });
      })}
    </div>
  );
};

Menu.defaultProps = {};
