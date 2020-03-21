/** @jsx jsx */
import React from "react";
import { animated, useSpring } from "react-spring";
import { easeCubicInOut } from "d3-ease";
import isEqual from "lodash/isEqual";
import { Portal } from "../portal";
import { IPlacementType } from "../enum/placement";
import { jsx, Interpolation } from "../theme";

export interface IPopperProps {
  placement?: IPlacementType;
  content: React.ReactNode;
  trigger?: "hover" | "focus" | "click" | "contextMenu";
  children: React.ReactNode;
}

export const Popper: React.SFC<IPopperProps> = props => {
  const { placement, content, trigger, children } = props;

  const [visible, setVisible] = React.useState(false);
  const [mount, setMount] = React.useState(false);
  // children rect
  const [chRect, setchRect] = React.useState<DOMRect | null>(null);
  // content rect
  // const [coRect, setCoRect] = React.useState<DOMRect | null>(null);
  const [scrollRect, setScrollRect] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  /** animation timer */
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const eventTimer = React.useRef<NodeJS.Timeout | null>(null);

  /** leave and enter animations */
  const contentAnimation = useSpring({
    opacity: visible ? 1 : 0,
    config: { easing: easeCubicInOut, duration: 200 },
  });

  const childrenRef = React.useRef<HTMLElement>();
  const contentRef = React.useRef<HTMLElement>();

  const childrenPosition = React.useMemo<Interpolation>(() => {
    if (!chRect) {
      return { top: 0, left: 0 };
    }
    switch (placement) {
      case "top":
        return {
          top: chRect.top,
          left: chRect.left,
          transform: `translate3d(calc(${chRect.width / 2}px - 50%),-100%,0)`,
        };
      case "topLeft":
        return {
          top: chRect.top,
          left: chRect.left,
          transform: `translate3d(0,-100%,0)`,
        };
      case "topRight":
        return {
          top: chRect.top,
          left: chRect.left + chRect.width,
          transform: `translate3d(-100%,-100%,0)`,
        };
      case "bottom":
        return {
          top: chRect.top + chRect.height,
          left: chRect.left,
          transform: `translate3d(calc(${chRect.width / 2}px - 50%),0,0)`,
        };
      case "bottomLeft":
        return { top: chRect.top + chRect.height, left: chRect.left };
      case "bottomRight":
        return {
          top: chRect.top + chRect.height,
          left: chRect.left + chRect.width,
          transform: `translate3d(-100%,0,0)`,
        };
      case "left":
        return {
          top: chRect.top,
          left: chRect.left,
          transform: `translate3d(-100%,calc(${chRect.height / 2}px - 50%),0)`,
        };
      case "leftBottom":
        return {
          top: chRect.top + chRect.height,
          left: chRect.left,
          transform: `translate3d(-100%,-100%,0)`,
        };
      case "leftTop":
        return {
          top: chRect.top,
          left: chRect.left,
          transform: `translate3d(-100%,0,0)`,
        };
      case "right":
        return {
          top: chRect.top,
          left: chRect.left + chRect.width,
          transform: `translate3d(0,calc(${chRect.height / 2}px - 50%),0)`,
        };
      case "rightBottom":
        return {
          top: chRect.top + chRect.height,
          left: chRect.left + chRect.width,
          transform: `translate3d(0,-100%,0)`,
        };
      case "rightTop":
        return {
          top: chRect.top,
          left: chRect.left + chRect.width,
        };
      default:
        return { top: chRect.top, left: chRect.left };
    }
  }, [chRect, scrollRect, placement]);

  React.useEffect(() => {
    const handleTriggerEvent = (e: Event) => {
      if (eventTimer.current) {
        clearTimeout(eventTimer.current);
        eventTimer.current = null;
      }
      eventTimer.current = setTimeout(() => {
        if (!(e.target instanceof HTMLElement)) {
          return;
        }
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        // true: the event target is contained in content or children.
        const isContained =
          (childrenRef.current && childrenRef.current.contains(e.target)) ||
          (contentRef.current && contentRef.current.contains(e.target));
        if (isContained) {
          if (visible && mount) {
            return;
          }
          const d = childrenRef.current?.ownerDocument?.documentElement;
          setScrollRect({ x: d?.scrollLeft || 0, y: d?.scrollTop || 0 });
          setVisible(true);
          setMount(true);
        } else {
          if (!mount && !visible) {
            return;
          }
          setVisible(false);
          timer.current = setTimeout(() => {
            setMount(false);
            timer.current = null;
          }, 200);
        }
      }, 0);
    };
    if (childrenRef.current) {
      const rect = childrenRef.current.getBoundingClientRect();
      if (!isEqual(rect, chRect)) {
        setchRect(rect);
      }
      document.addEventListener("mousemove", handleTriggerEvent);
      return () => {
        document.removeEventListener("mousemove", handleTriggerEvent);
      };
    }
    // if (contentRef.current) {
    //   const rect = contentRef.current.getBoundingClientRect();
    //   if (!isEqual(rect, coRect)) {
    //     setCoRect(rect);
    //   }
    // }
    return;
  }, [
    children,
    childrenRef.current,
    placement,
    contentRef.current,
    visible,
    mount,
    timer.current,
    eventTimer.current,
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
};