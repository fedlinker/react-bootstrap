import React from "react";
import { Dropdown } from "../dropdown";
import { MenuItem, SubMenu } from "../../menu";
import { Button } from "../../button";
import { DropdownBase } from "../dropdown-base";
import { ISizeType } from "src/components/enum/size";

export default {
  title: "Dropdown",
};

export const DropdownUsage = () => {
  return (
    <Dropdown
      content={
        <>
          <MenuItem path="1">1</MenuItem>
          <MenuItem path="2">2</MenuItem>
          <MenuItem path="3">3</MenuItem>
        </>
      }
    >
      dropdown
    </Dropdown>
  );
};

export const DropdownSizeUsage = () => {
  const sizes: ISizeType[] = ["default", "lg", "sm"];

  return sizes.map(o => {
    return (
      <div key={o} style={{ marginBottom: "16px" }}>
        <Dropdown
          size={o}
          content={
            <>
              <MenuItem path="1">1</MenuItem>
              <MenuItem path="2">2</MenuItem>
              <MenuItem path="3">3</MenuItem>
            </>
          }
        >
          dropdown
        </Dropdown>
      </div>
    );
  });
};

export const BaseUsage = () => {
  return (
    <DropdownBase
      content={
        <>
          <MenuItem path="1">1</MenuItem>
          <MenuItem path="2">2</MenuItem>
          <SubMenu mode="pop" title="3">
            <MenuItem path="3-1">3-1</MenuItem>
          </SubMenu>
        </>
      }
    >
      <Button>Dropdown</Button>
    </DropdownBase>
  );
};
