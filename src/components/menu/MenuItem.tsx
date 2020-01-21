/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { transparentizeTheme } from "../utils/colors";

interface IMenuItemProps {
  path: string;
  level?: number;
  onClick?(path: string): void;
  children?: React.ReactNode;
}

const MenuItem: React.SFC<IMenuItemProps> = props => {
  const { children, path, onClick, level } = props;
  return (
    <div
      sx={{
        color: "text",
        boxSizing: "border-box",
        paddingLeft: `${8 + 12 * level!}px`,
        lineHeight: "64px",
        borderBottom: t => `1px solid ${t.colors.border}`,
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          color: "primary",
          backgroundColor: transparentizeTheme("primary", 0.95),
        },
      }}
      onClick={() => onClick && onClick(path)}
    >
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  level: 1,
};

export default MenuItem;
