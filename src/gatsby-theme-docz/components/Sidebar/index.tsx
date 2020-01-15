import React, { useState, useMemo } from "react";
import { useMenus, useCurrentDoc, MenuItem as IDoczMenuItem } from "docz";
import { map } from "lodash";
import { navigate } from "gatsby";
import Menu from "@/menu/Menu";
import MenuItem from "@/menu/MenuItem";
import SubMenu from "@/menu/SubMenu";

export default function Sidebar() {
  const [query] = useState("");
  const menus = useMenus({ query });
  const currentDoc: IDoczMenuItem = useCurrentDoc();

  const renderMenuItem = (opt: IDoczMenuItem) => {
    if (Array.isArray(opt.menu)) {
      return (
        <SubMenu>
          {map(opt.menu, o => (
            <div key={o.route}>{renderMenuItem(o)}</div>
          ))}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem
          path={opt.route || ""}
          onClick={url => {
            if (currentDoc.route !== url) {
              navigate(url);
            }
          }}
        >
          {opt.name}
        </MenuItem>
      );
    }
  };

  return (
    <div>
      <Menu>
        {map(menus, m => (
          <div key={m.route + m.name}>{renderMenuItem(m)}</div>
        ))}
      </Menu>
    </div>
  );
}
