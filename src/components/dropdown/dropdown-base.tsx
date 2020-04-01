import React from "react";
import { Popper, IPopperChildrenRenderType } from "../popper";
import { Menu, IMenuChildType } from "../menu";
import { Placement } from "@popperjs/core";

export interface IDropdownBaseShareProps {
  content?: IMenuChildType[] | IMenuChildType;
  placement?: Placement;
  onClick?(path: string): void;
}
export interface IDropdownBaseProps extends IDropdownBaseShareProps {
  children: IPopperChildrenRenderType;
}

export const DropdownBase: React.FC<IDropdownBaseProps> = props => {
  const { content, children, onClick, placement } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Popper
      isOpen={open}
      onIsOpenChange={newOpen => setOpen(newOpen)}
      content={
        <Menu
          onClick={path => {
            onClick && onClick(path);
            setOpen(false);
          }}
        >
          {content}
        </Menu>
      }
      trigger="click"
      placement={placement}
    >
      {children}
    </Popper>
  );
};

DropdownBase.defaultProps = {
  placement: "right-start",
};
