import React, { CSSProperties, SFC, useState } from "react";

export interface IMenuProps {
  style?: CSSProperties;
  children?: React.ReactNode;
}

const Menu: SFC<IMenuProps> = props => {
  const { style, children } = props;
  const [baseProps] = useState({ level: 1 });
  return (
    <div
      sx={{
        width: "100%",
        color: "text",
        fontSize: 2,
        backgroundColor: "background",
        ...(style || {}),
      }}
    >
      {React.Children.map(children, (c, i) => {
        return React.cloneElement(c as React.ReactElement, { ...baseProps });
      })}
    </div>
  );
};

Menu.defaultProps = {};

export default Menu;
