import React from "react";
import { Dropdown } from "../dropdown";
import { MenuItem, SubMenu } from "../../menu";
import { Button, IButtonTypeKey } from "../../button";
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

export const SplitUsage = () => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Dropdown
        content={
          <>
            <MenuItem path="1">1</MenuItem>
            <MenuItem path="2">2</MenuItem>
            <MenuItem path="3">3</MenuItem>
          </>
        }
        split
      >
        dropdown
      </Dropdown>
    </div>
  );
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

export const TypeUsage = () => {
  const types: IButtonTypeKey[] = [
    "light",
    "primary",
    "danger",
    "info",
    "success",
    "warning",
  ];
  const menus = (
    <>
      <MenuItem path="1">1</MenuItem>
      <MenuItem path="2">2</MenuItem>
      <SubMenu mode="pop" title="3">
        <MenuItem path="3-1">3-1</MenuItem>
      </SubMenu>
    </>
  );
  return (
    <div>
      {types.map(o => {
        return (
          <div key={o} style={{ marginBottom: "16px" }}>
            <Dropdown content={menus} type={o} split>
              {o}
            </Dropdown>
          </div>
        );
      })}
    </div>
  );
};

export const HasArrow = () => {
  const menus = (
    <>
      <MenuItem path="1">1</MenuItem>
      <MenuItem path="2">2</MenuItem>
      <SubMenu mode="pop" title="3">
        <MenuItem path="3-1">3-1</MenuItem>
      </SubMenu>
    </>
  );
  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Dropdown hasArrow content={menus}>
          arrow (placement is default)
        </Dropdown>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <Dropdown hasArrow content={menus} placement="bottom">
          arrow (placement is bottom)
        </Dropdown>
      </div>
    </div>
  );
};
