import React, { useEffect } from "react";

interface IClickOutsideProps {
  mouseEvent?: "click" | "mousedown" | "mouseup" | false;
  touchEvent?: "touchstart" | "touchend" | false;
  onClickOutside?: (event: Event) => void;
  children: React.ReactNode;
}

/**
 * if you click the outside of children,
 * the onClickOutside event will be triggered.
 */
export const ClickOutside = React.forwardRef<HTMLElement, IClickOutsideProps>(
  (props, ref) => {
    const { children, onClickOutside, mouseEvent, touchEvent } = props;
    const nodeRef = React.createRef<HTMLElement>();

    const handleClickOutside = React.useCallback(
      (e: Event) => {
        if (e.target instanceof Element && nodeRef.current) {
          if (!nodeRef.current.contains(e.target)) {
            onClickOutside && onClickOutside(e);
          }
        }
      },
      [nodeRef.current, onClickOutside]
    );

    useEffect(() => {
      const d = nodeRef.current?.ownerDocument || document;
      if (nodeRef.current) {
        mouseEvent && d.addEventListener(mouseEvent, handleClickOutside);
        touchEvent && d.addEventListener(touchEvent, handleClickOutside);
      }
      return () => {
        mouseEvent && d.removeEventListener(mouseEvent, handleClickOutside);
        touchEvent && d.removeEventListener(touchEvent, handleClickOutside);
      };
    }, [nodeRef.current, children]);

    if (!React.isValidElement(children)) {
      return null;
    }
    return React.cloneElement(children, { ref: nodeRef });
  }
);

ClickOutside.defaultProps = {
  mouseEvent: "click",
  touchEvent: "touchend",
};
