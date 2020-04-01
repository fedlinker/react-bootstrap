import React from "react";
import { IDropdownBaseShareProps, DropdownBase } from "./dropdown-base";
import { ISizeType } from "../enum/size";
import { ButtonGroup, Button } from "../button";
import { SolidCaretDown } from "@fedlinker/font-awesome";

export interface IDropdownProps extends IDropdownBaseShareProps {
  size?: ISizeType;
  children?: React.ReactNode;
}

export const Dropdown: React.FC<IDropdownProps> = props => {
  const { children, size, ...rest } = props;

  return (
    <DropdownBase {...rest}>
      {/* <Button size={size}>
        {children}
        <SolidCaretDown />
      </Button> */}
      <ButtonGroup size={size}>
        <Button size={size}>
          {children}
          <SolidCaretDown />
        </Button>
      </ButtonGroup>
    </DropdownBase>
  );
};

Dropdown.defaultProps = {
  placement: "right-start",
};
