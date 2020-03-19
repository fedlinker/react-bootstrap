/** @jsx jsx */
import React, { SFC, useState } from "react";
import { jsx, getCss, Interpolation } from "../theme";

export interface IMenuProps {
  style?: Interpolation;
  children?: React.ReactNode;
}

export const Menu: SFC<IMenuProps> = props => {
  const { style, children } = props;
  const [baseProps] = useState({ level: 1 });
  return (
    <div
      css={[
        getCss({
          width: "100%",
          color: "text",
          fontSize: 2,
          backgroundColor: "background",
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
