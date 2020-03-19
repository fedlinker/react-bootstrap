/** @jsx jsx */
import React from "react";
import { jsx, getCss } from "../theme";
import { SolidAngleDown } from "@fedlinker/font-awesome";

export interface ISubMenuProps {
  title: React.ReactNode;
  level?: number;
  children?: React.ReactNode;
}

export const SubMenu: React.SFC<ISubMenuProps> = props => {
  const { title, children, level } = props;
  return (
    <div>
      <div
        css={getCss({
          boxSizing: "border-box",
          paddingLeft: `${8 + 12 * level!}px`,
          paddingRight: "8px",
          lineHeight: "64px",
          display: "flex",
          color: "text",
          transition: "all 0.3s",
          borderBottom: "1px solid",
          borderBottomColor: "border",
          "&:hover": {
            color: "primary",
          },
        })}
      >
        <div css={{ flex: 1 }}>{title}</div>
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
