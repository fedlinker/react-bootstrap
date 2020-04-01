import React, { useState } from "react";
import { Menu } from "../Menu";
import { MenuItem } from "../MenuItem";
import { SubMenu } from "../SubMenu";
import { Popper } from "../../popper";
import { Button } from "../../button";
import { MenuDivider } from "../menu-divider";

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
        <SubMenu title="submenu2">
          <MenuItem path="sub-2-1">sub-2-1</MenuItem>
          <MenuItem path="sub-2-2" disabled>
            sub-2-2
          </MenuItem>
          <SubMenu title="submenu2-2">
            <MenuItem path="sub-2-3-1">sub-2-3-1</MenuItem>
            <MenuItem path="sub-2-3-2">sub-2-3-2</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
};

export const PopperSubMenu = () => {
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

export const PopperMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Popper
        isOpen={open}
        onIsOpenChange={newOpen => setOpen(newOpen)}
        content={
          <Menu
            onClick={e => {
              console.log(e);
              setOpen(false);
            }}
          >
            <MenuItem path="123">123</MenuItem>
            <SubMenu title="submenu1">
              <MenuItem path="sub-1-1">sub-1-1</MenuItem>
            </SubMenu>
            <SubMenu title="submenu2" mode="pop">
              <MenuItem path="sub-2-1">sub-2-1</MenuItem>
              <MenuItem path="sub-2-2">sub-2-2</MenuItem>
              <MenuDivider />
              <SubMenu title="submenu2-2" mode="pop">
                <MenuItem path="sub-2-3-1">sub-2-3-1</MenuItem>
                <MenuItem path="sub-2-3-2">sub-2-3-2</MenuItem>
              </SubMenu>
            </SubMenu>
          </Menu>
        }
        trigger="click"
        placement="right-start"
      >
        <Button>Click menu</Button>
      </Popper>
    </div>
  );
};
