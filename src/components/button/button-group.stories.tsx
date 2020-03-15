import React from "react";
import { ButtonGroup } from "./button-group";
import { Button, IButtonSizeKey } from "./button";

export default {
  title: "Button Group",
  component: ButtonGroup,
};

export const BasicUsage = () => {
  return (
    <ButtonGroup>
      <Button type="primary">no.1</Button>
      <Button type="primary">no.2</Button>
      <Button type="primary">no.3</Button>
    </ButtonGroup>
  );
};

export const ButtonSize = () => {
  const buttonSize: Array<IButtonSizeKey | undefined> = ["lg", "sm", undefined];
  return buttonSize.map(o => {
    return (
      <ButtonGroup size={o} style={{ marginBottom: "8px" }}>
        <Button type="primary">no.1</Button>
        <Button type="primary">no.2</Button>
        <Button type="primary" disabled>
          no.3
        </Button>
      </ButtonGroup>
    );
  });
};

export const ButtonOutline = () => {
  return (
    <>
      <ButtonGroup outline type="primary" style={{ marginBottom: "8px" }}>
        <Button>no.1</Button>
        <Button>no.2</Button>
        <Button>no.3</Button>
      </ButtonGroup>
      <ButtonGroup outline type="primary" size="sm">
        <Button>no.1</Button>
        <Button>no.2</Button>
        <Button>no.3</Button>
      </ButtonGroup>
    </>
  );
};
