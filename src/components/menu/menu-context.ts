import React from "react";

export interface IMenuContextValue {
  open: boolean;
  setOpen?(open: boolean): void;
  onClick?(path: string): void;
}

export const MenuContext = React.createContext<IMenuContextValue>({
  open: false,
});
