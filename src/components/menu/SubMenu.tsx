/** @jsx jsx */
import React from "react";
import { jsx, getCss } from "../theme";
import { SolidAngleDown } from "@fedlinker/font-awesome";
import { baseMenuItemStyle } from "./MenuItem";
// import { useRefRect } from "../hooks";
// import { animated, useSpring } from "react-spring";
import { Popper } from "../popper";
import { transparentize } from "polished";
import { MenuContext } from "./menu-context";
import { IMenuChildType, baseMenuStyles } from "./Menu";
import map from "lodash/map";

export interface ISubMenuProps {
  title: React.ReactNode;
  level?: number;
  children?: IMenuChildType[] | IMenuChildType;
  defaultCollapse?: boolean;
  mode?: "pop" | "inline";
}

export const SubMenu: React.FC<ISubMenuProps> = props => {
  const { title, children, level, defaultCollapse, mode } = props;
  const [collapse, setCollapse] = React.useState<boolean>(defaultCollapse!);
  const [open, setOpen] = React.useState<boolean>(false);
  const childrenRef = React.useRef<HTMLDivElement>(null);
  // const childrenRect = useRefRect(childrenRef, [collapse]);

  const ctx = React.useContext(MenuContext);

  // const animationStyle = useSpring({
  //   height: collapse ? 0 : childrenRect?.height,
  //   overflow: "hidden",
  // });

  const isInline = React.useMemo(() => {
    return mode === "inline";
  }, [mode]);

  const menuItems = (
    <div ref={childrenRef}>
      {map(
        Array.isArray(children) ? children : [children],
        (c: IMenuChildType, i) => {
          return React.cloneElement(c, {
            level: mode === "pop" ? 0 : level! + 1,
          });
        }
      )}
    </div>
  );

  const menuTitle = (
    <div
      css={[
        baseMenuItemStyle,
        getCss({
          paddingLeft: t => `calc(${t.space[6] || 0} + ${0.75 * level!}rem)`,
          "& > *": {
            transition: "all 0.2s",
          },
          backgroundColor: open ? "light" : undefined,
        }),
      ]}
      onClick={() => {
        if (mode !== "inline") return;
        setCollapse(!collapse);
      }}
    >
      <div css={{ flex: 1 }}>{title}</div>
      <SolidAngleDown
        style={{
          transform: `rotate(${
            mode === "inline" ? (collapse ? 0 : 180) : -90
          }deg)`,
        }}
      />
    </div>
  );

  React.useLayoutEffect(() => {
    if (!ctx.open && open) {
      setOpen(false);
    }
  }, [ctx.open, open]);

  return (
    <Popper
      content={
        <div
          css={[
            getCss({
              boxShadow: t => `0 0 6px ${transparentize(0.9)(t.colors.text)}`,
            }),
            baseMenuStyles,
          ]}
        >
          {menuItems}
        </div>
      }
      isOpen={open}
      onIsOpenChange={newOpen => {
        if (!ctx.open && ctx.setOpen) {
          ctx.setOpen(true);
        }
        setOpen(newOpen);
      }}
      placement="right-start"
      disabled={isInline}
      inline
    >
      <div>
        {menuTitle}
        {isInline && !collapse && menuItems
        // <animated.div style={animationStyle}>{menuItems}</animated.div>
        }
      </div>
    </Popper>
  );
};

SubMenu.defaultProps = {
  level: 1,
  defaultCollapse: true,
  mode: "inline",
};
