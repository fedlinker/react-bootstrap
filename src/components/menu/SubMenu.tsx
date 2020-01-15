/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { SolidAngleDown } from "@fedlinker/font-awesome";

interface ISubMenuProps {
  level?: number;
  children?: React.ReactNode;
}

const SubMenu: React.SFC<ISubMenuProps> = props => {
  const { children, level } = props;
  return (
    <div sx={{}}>
      <div
        sx={{
          boxSizing: "border-box",
          paddingLeft: `${8 + 12 * level!}px`,
          paddingRight: "8px",
          lineHeight: "64px",
          display: "flex",
          color: "text",
          transition: "all 0.3s",
          borderBottom: t => `1px solid ${t.colors.border}`,
          "&:hover": {
            color: "primary",
          },
        }}
      >
        <div sx={{ flex: 1 }}>SubMenu</div>
        <SolidAngleDown />
      </div>
      {React.Children.map(children, (c, i) => {
        return React.cloneElement(c as React.ReactElement, {
          level: level! + 1,
        });
      })}
    </div>
  );
};

SubMenu.defaultProps = {
  level: 1,
};

export default SubMenu;
