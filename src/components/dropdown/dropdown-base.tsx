import React from "react";
import { Popper, IPopperChildrenRenderType } from "../popper";
import { Menu, IMenuChildType } from "../menu";
import { Placement } from "@popperjs/core";
import { transparentize } from "polished";

export interface IDropdownBaseShareProps {
  content?: IMenuChildType[] | IMenuChildType;
  placement?: Placement;
  onClick?(path: string): void;
  hasArrow?: boolean;
}
export interface IDropdownBaseProps extends IDropdownBaseShareProps {
  children: IPopperChildrenRenderType;
}

export const DropdownBase: React.FC<IDropdownBaseProps> = props => {
  const { content, children, onClick, placement, hasArrow } = props;
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
          style={t => ({
            boxShadow: `0 0 6px ${transparentize(0.9)(t.colors.text)}`,
          })}
        >
          {content}
        </Menu>
      }
      trigger="click"
      placement={placement}
      arrow={
        hasArrow
          ? { borderColor: "border", backgroundColor: "background" }
          : undefined
      }
    >
      {children}
    </Popper>
  );
};

DropdownBase.defaultProps = {
  placement: "right-start",
  hasArrow: false,
};
