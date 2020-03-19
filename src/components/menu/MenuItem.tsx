/** @jsx jsx */
import React from "react";
import { jsx, getCss } from "../theme";
import { transparentizeTheme } from "../utils/colors";

export interface IMenuItemProps {
  path: string;
  level?: number;
  onClick?(path: string): void;
  children?: React.ReactNode;
}

export const MenuItem: React.SFC<IMenuItemProps> = props => {
  const { children, path, onClick, level } = props;
  return (
    <div
      css={getCss({
        color: "text",
        boxSizing: "border-box",
        paddingLeft: `${8 + 12 * level!}px`,
        lineHeight: "64px",
        borderBottom: `1px solid`,
        borderBottomColor: "border",
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          color: "primary",
          backgroundColor: transparentizeTheme("primary", 0.95),
        },
      })}
      onClick={() => onClick && onClick(path)}
    >
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  level: 1,
};
