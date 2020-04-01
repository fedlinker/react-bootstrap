/** @jsx jsx */
import React from "react";
import { jsx, getCss } from "../theme";
import { darkenTheme, textColorTheme } from "../utils/colors";
import { MenuContext } from "./menu-context";

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
  minWidth: "5rem",
  "&:hover": {
    color: darkenTheme("text", 0.05),
    backgroundColor: "light",
  },
  "&:active": {
    backgroundColor: darkenTheme("light", 0.05),
  },
});

export const MenuItem: React.SFC<IMenuItemProps> = props => {
  const { children, path, onClick, level } = props;
  const ctx = React.useContext(MenuContext);

  return (
    <div
      css={[
        baseMenuItemStyle,
        getCss({
          paddingLeft: t => `calc(${t.space[6] || 0} + ${0.75 * level!}rem)`,
        }),
      ]}
      onClick={() => {
        onClick && onClick(path);
        ctx.setOpen && ctx.setOpen(false);
        ctx.onClick && ctx.onClick(path);
      }}
    >
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  level: 1,
};
