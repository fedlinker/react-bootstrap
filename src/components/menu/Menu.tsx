/** @jsx jsx */
import React, { FC, useState, FunctionComponentElement } from "react";
import map from "lodash/map";
import { jsx, getCss, Interpolation } from "../theme";
import { transparentizeTheme } from "../utils/colors";
import { MenuContext } from "./menu-context";
import { IMenuItemProps } from "./MenuItem";
import { ISubMenuProps } from "./SubMenu";

export type IMenuChildType = FunctionComponentElement<
  IMenuItemProps | ISubMenuProps
>;

export interface IMenuProps {
  style?: Interpolation;
  children?: IMenuChildType[] | IMenuChildType;
  onClick?(path: string): void;
}

export const Menu: FC<IMenuProps> = props => {
  const { style, onClick, children } = props;
  const [baseProps] = useState({ level: 0 });
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = React.useCallback((path: string) => {
    onClick && onClick(path);
  }, []);

  return (
    <MenuContext.Provider value={{ open, setOpen, onClick: handleClick }}>
      <div
        css={[
          getCss({
            display: "inline-block",
            color: "text",
            fontSize: 2,
            backgroundColor: "background",
            paddingTop: 2,
            paddingBottom: 2,
            border: "1px solid",
            borderColor: transparentizeTheme("text", 0.85),
            borderRadius: "default",
            minWidth: "10rem",
          }),
          style,
        ]}
      >
        {map(
          Array.isArray(children) ? children : [children],
          (c: IMenuChildType, i) => {
            return React.cloneElement(c, {
              key: i,
              ...baseProps,
            });
          }
        )}
      </div>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {};
