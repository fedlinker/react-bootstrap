/** @jsx jsx */
import React from "react";
import { animated, useSpring } from "react-spring";
import { easeCubicInOut } from "d3-ease";
import { Portal } from "../portal";
import { IPlacementType } from "../enum/placement";
import { jsx, Interpolation } from "../theme";
import { useRefRect } from "../hooks";

export type IPopperTriggerType = "hover" | "click";
export interface IDelayObject {
  show: number;
  hide: number;
}

export interface IPopperProps {
  placement?: IPlacementType;
  /**
   * trigger content
   */
  content: React.ReactNode;
  /**
   * trigger ways.
   */
  trigger?: IPopperTriggerType;
  /**
   * trigger component node.
   */
  children: React.ReactNode;
  /**
   * show and hide animation delay durations.
   */
  delay?: number | IDelayObject;
  /**
   * auto change the placement based on position
   */
  autoFixPlacement?: boolean;
}

export const Popper: React.SFC<IPopperProps> = props => {
  const {
    placement,
    content,
    trigger,
    delay,
    children,
    autoFixPlacement,
  } = props;

  const [visible, setVisible] = React.useState(false);
  const [mount, setMount] = React.useState(false);

  const childrenRef = React.useRef<HTMLElement>();
  const contentRef = React.useRef<HTMLElement>();

  const sRect = React.useMemo(() => {
    const d =
      childrenRef.current?.ownerDocument?.documentElement ||
      document.documentElement;
    return {
      x: d.scrollLeft,
      y: d.scrollTop,
      w: d.clientWidth,
      h: d.clientHeight,
    };
  }, [visible, mount]);
  // children rect
  const chRect = useRefRect(childrenRef, [visible, mount]);
  // content rect
  const coRect = useRefRect(contentRef, [visible, mount]);

  /** animation timer */
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  /** leave and enter animations */
  const contentAnimation = useSpring({
    opacity: visible ? 1 : 0,
    config: { easing: easeCubicInOut, duration: 200 },
    delay:
      typeof delay === "number" ? delay : visible ? delay?.show : delay?.hide,
  });

  const childrenPosition = React.useMemo<Interpolation>(() => {
    if (!mount) {
      return {};
    }
    let vals: Interpolation = { top: 0, left: 0 };
    let p = placement!;
    if (chRect) {
      // fix the placement based on rect
      if (coRect && autoFixPlacement) {
        if (p.indexOf("top") === 0) {
          if (chRect.top < coRect.height) {
            p = p.replace("top", "bottom") as IPlacementType;
          }
        } else if (p.indexOf("bottom") === 0) {
          if (chRect.top + chRect.height + coRect.height > sRect.h) {
            p = p.replace("bottom", "top") as IPlacementType;
          }
        } else if (p.indexOf("left") === 0) {
          if (chRect.left < coRect.width) {
            p = p.replace("left", "right") as IPlacementType;
          }
        } else if (p.indexOf("right") === 0) {
          if (chRect.left + chRect.width + coRect.width > sRect.w) {
            p = p.replace("right", "left") as IPlacementType;
          }
        }
      }

      switch (p) {
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
  }, [chRect, sRect, coRect, placement, mount]);

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
    const d =
      childrenRef.current?.ownerDocument?.documentElement ||
      document.documentElement;

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
      const eventStr = trigger === "hover" ? "mousemove" : "click";
      d.addEventListener(eventStr, handleTriggerEvent);

      // when blured, hide the popper content
      childrenRef.current.addEventListener("blur", handleTriggerEvent);
      if (trigger === "hover") {
        childrenRef.current.addEventListener("focus", handleTriggerEvent);
      }
      return () => {
        // remove listeners
        d.removeEventListener(eventStr, handleTriggerEvent);
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
  autoFixPlacement: true,
};
