/** @jsx jsx */
import React from "react";
import { jsx, Interpolation } from "../theme";

export interface IRowProps {
  style?: Interpolation;
  children?: React.ReactNode;
}

export const Row: React.SFC<IRowProps> = props => {
  const { children, style = {} } = props;
  return (
    <div css={[{ display: "flex", flexWrap: "wrap", width: "100%" }, style]}>
      {children}
    </div>
  );
};
