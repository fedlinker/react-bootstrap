import React from "react";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { SubMenu } from "../SubMenu";

export default {
  title: "Menu",
};

export const BasicUsage = () => {
  return (
    <div style={{}}>
      <Menu>
        <MenuItem path="123">123</MenuItem>
        <SubMenu title="submenu1">
          <MenuItem path="sub-1-1">sub-1-1</MenuItem>
        </SubMenu>
        <SubMenu title="submenu2" mode="pop">
          <MenuItem path="sub-2-1">sub-2-1</MenuItem>
          <MenuItem path="sub-2-2">sub-2-2</MenuItem>
          <SubMenu title="submenu2-2" mode="pop">
            <MenuItem path="sub-2-3-1">sub-2-3-1</MenuItem>
            <MenuItem path="sub-2-3-2">sub-2-3-2</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
};
