import React from "react";
import ReactDOM from "react-dom";

export interface IPortalProps {
  container?: HTMLElement;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Portal = React.forwardRef<HTMLDivElement, IPortalProps>(
  (props, ref) => {
    const { container, children, disabled } = props;

    return disabled ? null : (
      <div ref={ref}>{ReactDOM.createPortal(children, container!)}</div>
    );
  }
);

Portal.defaultProps = {
  container: document.body,
};
