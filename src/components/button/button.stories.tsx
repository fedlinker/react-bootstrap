import React from "react";
import { Button, EButtonType, IButtonTypeKey } from "./index";

export default { title: "Button" };

export const buttonType = () => {
  const margin = "12px";
  const types: IButtonTypeKey[] = [
    "primary",
    "success",
    "warning",
    "danger",
    "info",
    "light",
    "dark",
  ];
  return types.map(t => {
    return (
      <Button type={t} key={t} style={{ margin }}>
        {t.toUpperCase()}
      </Button>
    );
  });
};
