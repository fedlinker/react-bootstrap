import React from "react";
import { IDropdownBaseShareProps, DropdownBase } from "./dropdown-base";
import { ISizeType } from "../enum/size";
import { ButtonGroup, Button, IButtonTypeKey } from "../button";
import { SolidCaretDown } from "@fedlinker/font-awesome";

export interface IDropdownProps extends IDropdownBaseShareProps {
  size?: ISizeType;
  split?: boolean;
  type?: IButtonTypeKey;
  children?: React.ReactNode;
}

export const Dropdown: React.FC<IDropdownProps> = props => {
  const { children, size, split, type, ...rest } = props;

  return (
    <DropdownBase {...rest}>
      {({ ref }) => {
        if (split) {
          return (
            <ButtonGroup size={size} type={type}>
              <Button>{children}</Button>
              <Button ref={ref}>
                <SolidCaretDown />
              </Button>
            </ButtonGroup>
          );
        }
        return (
          <ButtonGroup size={size} type={type} ref={ref}>
            <Button>
              {children}
              <SolidCaretDown />
            </Button>
          </ButtonGroup>
        );
      }}
    </DropdownBase>
  );
};

Dropdown.defaultProps = {
  placement: "right-start",
  split: false,
};
