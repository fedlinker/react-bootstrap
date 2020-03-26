/** @jsx jsx */
import React from "react";
import { jsx, getCss } from "../theme";
import { darkenTheme } from "../utils/colors";

export interface IMenuItemProps {
  path: string;
  level?: number;
  onClick?(path: string): void;
  children?: React.ReactNode;
}

export const baseMenuItemStyle = getCss({
  display: "flex",
  color: "text",
  boxSizing: "border-box",
  paddingLeft: 6,
  paddingRight: 6,
  paddingTop: 1,
  paddingBottom: 1,
  cursor: "pointer",
  transition: "all 0.3s",
  width: "100%",
  clear: "both",
  textAlign: "inherit",
  backgroundColor: "transparent",
  "&:hover": {
    color: darkenTheme("text", 0.05),
    backgroundColor: "light",
  },
});

export const MenuItem: React.SFC<IMenuItemProps> = props => {
  const { children, path, onClick, level } = props;
  return (
    <div
      css={[
        baseMenuItemStyle,
        getCss({
          paddingLeft: t => `calc(${t.space[6] || 0} + ${0.75 * level!}rem)`,
        }),
      ]}
      onClick={() => onClick && onClick(path)}
    >
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  level: 1,
};
