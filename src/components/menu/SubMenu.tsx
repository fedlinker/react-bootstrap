/** @jsx jsx */
import React from "react";
import { jsx, getCss } from "../theme";
import { SolidAngleDown } from "@fedlinker/font-awesome";
import { baseMenuItemStyle } from "./MenuItem";
import { useRefRect } from "../hooks";
import { animated, useSpring } from "react-spring";
import { Popper } from "../popper";
import { transparentizeTheme } from "../utils/colors";

export interface ISubMenuProps {
  title: React.ReactNode;
  level?: number;
  children?: React.ReactNode;
  defaultCollapse?: boolean;
  mode?: "pop" | "inline";
}

export const SubMenu: React.SFC<ISubMenuProps> = props => {
  const { title, children, level, defaultCollapse, mode } = props;
  const [collapse, setCollapse] = React.useState<boolean>(defaultCollapse!);
  const childrenRef = React.useRef<HTMLDivElement>(null);
  const childrenRect = useRefRect(childrenRef);

  const animationStyle = useSpring({
    height: collapse ? 0 : childrenRect?.height,
    overflow: "hidden",
  });

  const menuItems = (
    <div ref={childrenRef}>
      {React.Children.map(children, (c, i) => {
        return React.cloneElement(c as React.ReactElement, {
          level: mode === "pop" ? 0 : level! + 1,
        });
      })}
    </div>
  );

  const menuTitle = (
    <div
      css={[
        baseMenuItemStyle,
        getCss({
          paddingLeft: t => `calc(${t.space[6] || 0} + ${0.75 * level!}rem)`,
          "& > *": {
            transition: "all 0.3s",
          },
        }),
      ]}
      onClick={() => {
        if (mode !== "inline") return;
        setCollapse(!collapse);
      }}
    >
      <div css={{ flex: 1 }}>{title}</div>
      <SolidAngleDown
        style={{ transform: `rotate(${collapse ? 0 : 180}deg)` }}
      />
    </div>
  );

  return (
    <Popper
      content={
        <div
          css={getCss({
            border: "1px solid",
            borderColor: transparentizeTheme("text", 0.85),
            borderRadius: "default",
          })}
        >
          {menuItems}
        </div>
      }
      trigger="click"
      placement="leftTop"
      offset={6}
      disabled={mode !== "pop"}
    >
      <div>
        {menuTitle}
        {mode === "inline" ? (
          <animated.div style={animationStyle}>{menuItems}</animated.div>
        ) : null}
      </div>
    </Popper>
  );
};

SubMenu.defaultProps = {
  level: 1,
  defaultCollapse: true,
  mode: "inline",
};
