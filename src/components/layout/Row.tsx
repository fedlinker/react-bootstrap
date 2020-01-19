/** @jsx jsx */
import React from "react";
import { jsx, SxStyleProp } from "theme-ui";

export interface IRowProps {
  style?: SxStyleProp;
  children?: React.ReactNode;
}

export const Row: React.SFC<IRowProps> = props => {
  const { children, style = {} } = props;
  return (
    <div sx={{ display: "flex", flexWrap: "wrap", width: "100%", ...style }}>
      {children}
    </div>
  );
};
