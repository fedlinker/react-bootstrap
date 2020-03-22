/** @jsx jsx */
import React from "react";
import { animated, useSpring } from "react-spring";
import { easeCubicInOut } from "d3-ease";
import isEqual from "lodash/isEqual";
import { Portal } from "../portal";
import { IPlacementType } from "../enum/placement";
import { jsx, Interpolation } from "../theme";

export type IPopperTriggerType = "hover" | "click";
export interface IDelayObject {
  show: number;
  hide: number;
}

export interface IPopperProps {
  placement?: IPlacementType;
  content: React.ReactNode;
  trigger?: IPopperTriggerType;
  children: React.ReactNode;
  delay?: number | IDelayObject;
}

export const Popper: React.SFC<IPopperProps> = props => {
  const { placement, content, trigger, delay, children } = props;

  const [visible, setVisible] = React.useState(false);
  const [mount, setMount] = React.useState(false);
  // children rect
  const [chRect, setchRect] = React.useState<DOMRect | null>(null);
  // content rect
  // const [coRect, setCoRect] = React.useState<DOMRect | null>(null);
  const [sRect, setSRect] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  /** animation timer */
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  /** leave and enter animations */
  const contentAnimation = useSpring({
    opacity: visible ? 1 : 0,
    config: { easing: easeCubicInOut, duration: 200 },
    delay:
      typeof delay === "number" ? delay : visible ? delay?.show : delay?.hide,
  });

  const childrenRef = React.useRef<HTMLElement>();
  const contentRef = React.useRef<HTMLElement>();

  const childrenPosition = React.useMemo<Interpolation>(() => {
    let vals: Interpolation = { top: 0, left: 0 };
    if (chRect) {
      switch (placement) {
        case "top":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(calc(${chRect.width / 2}px - 50%),-100%,0)`,
          };
          break;
        case "topLeft":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(0,-100%,0)`,
          };
          break;
        case "topRight":
          vals = {
            top: chRect.top,
            left: chRect.left + chRect.width,
            transform: `translate3d(-100%,-100%,0)`,
          };
          break;
        case "bottom":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left,
            transform: `translate3d(calc(${chRect.width / 2}px - 50%),0,0)`,
          };
          break;
        case "bottomLeft":
          vals = { top: chRect.top + chRect.height, left: chRect.left };
          break;
        case "bottomRight":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left + chRect.width,
            transform: `translate3d(-100%,0,0)`,
          };
          break;
        case "left":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(-100%,calc(${chRect.height /
              2}px - 50%),0)`,
          };
          break;
        case "leftBottom":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left,
            transform: `translate3d(-100%,-100%,0)`,
          };
          break;
        case "leftTop":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(-100%,0,0)`,
          };
          break;
        case "right":
          vals = {
            top: chRect.top,
            left: chRect.left + chRect.width,
            transform: `translate3d(0,calc(${chRect.height / 2}px - 50%),0)`,
          };
          break;
        case "rightBottom":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left + chRect.width,
            transform: `translate3d(0,-100%,0)`,
          };
          break;
        case "rightTop":
          vals = {
            top: chRect.top,
            left: chRect.left + chRect.width,
          };
      }
      (vals.top as number) += sRect.y;
      (vals.left as number) += sRect.x;
    }
    return vals;
  }, [chRect, sRect, placement]);

  React.useEffect(() => {
    // show the popper content
    const setShow = () => {
      if (visible && mount) {
        return;
      }
      setVisible(true);
      setMount(true);
    };
    // hide the popper content
    const setHide = () => {
      if (!mount && !visible) {
        return;
      }
      setVisible(false);
      timer.current = setTimeout(() => {
        setMount(false);
        timer.current = null;
      }, 200);
    };

    const handleTriggerEvent = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }
      // true: the event target is contained in content or children.
      const isContained =
        (childrenRef.current && childrenRef.current.contains(e.target)) ||
        (contentRef.current && contentRef.current.contains(e.target));
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }

      // get document scroll top
      const d = childrenRef.current?.ownerDocument?.documentElement;
      const newSRect = { x: d?.scrollLeft || 0, y: d?.scrollTop || 0 };
      if (!isEqual(newSRect, sRect)) {
        setSRect(newSRect);
      }

      // when focus, stop other event
      if (e.type === "focus") {
        setShow();
        return;
      } else if (e.type === "blur") {
        setHide();
        return;
      }

      if (isContained) {
        setShow();
      } else {
        setHide();
      }
    };
    if (childrenRef.current) {
      const rect = childrenRef.current.getBoundingClientRect();
      if (!isEqual(rect, chRect)) {
        setchRect(rect);
      }
      const eventStr = trigger === "hover" ? "mousemove" : "click";
      document.addEventListener(eventStr, handleTriggerEvent);

      // when blured, hide the popper content
      childrenRef.current.addEventListener("blur", handleTriggerEvent);
      if (trigger === "hover") {
        childrenRef.current.addEventListener("focus", handleTriggerEvent);
      }
      return () => {
        // remove listeners
        document.removeEventListener(eventStr, handleTriggerEvent);
        childrenRef.current?.removeEventListener("blur", handleTriggerEvent);
        if (trigger === "hover") {
          childrenRef.current?.removeEventListener("focus", handleTriggerEvent);
        }
      };
    }
    return;
  }, [
    children,
    childrenRef.current,
    placement,
    contentRef.current,
    visible,
    mount,
    timer.current,
    trigger,
  ]);

  return (
    <React.Fragment>
      {React.isValidElement(children)
        ? React.cloneElement(children, { ref: childrenRef })
        : null}
      <Portal>
        {mount && chRect ? (
          <animated.div
            style={contentAnimation}
            css={[
              {
                position: "absolute",
              },
              childrenPosition,
            ]}
          >
            {React.isValidElement(content)
              ? React.cloneElement(content, { ref: contentRef })
              : null}
          </animated.div>
        ) : null}
      </Portal>
    </React.Fragment>
  );
};

Popper.defaultProps = {
  placement: "bottom",
  trigger: "hover",
  delay: 0,
};
