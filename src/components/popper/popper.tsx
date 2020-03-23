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
export type IContentRenderPropsType = (props: {
  rect: DOMRect;
  contentRect?: DOMRect;
  fixedPlacement: IPlacementType;
}) => React.ReactNode;

export interface IPopperProps {
  placement?: IPlacementType;
  /**
   * trigger content
   */
  content: React.ReactNode | IContentRenderPropsType;
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
   * auto change the placement based on position.
   */
  autoFixPlacement?: boolean;

  /**
   * the distance between content and children.
   * number unit is pixel
   */
  offset?: number;
}

export const Popper: React.SFC<IPopperProps> = props => {
  const {
    placement,
    content,
    trigger,
    delay,
    children,
    autoFixPlacement,
    offset,
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

  // fix the placement based on rect
  const fixedPlacement = React.useMemo(() => {
    let p = placement!;
    if (chRect && coRect) {
      // fix the placement based on rect
      if (autoFixPlacement) {
        if (p.indexOf("top") === 0) {
          if (chRect.top < coRect.height + offset!) {
            p = p.replace("top", "bottom") as IPlacementType;
          }
        } else if (p.indexOf("bottom") === 0) {
          if (chRect.top + chRect.height + coRect.height + offset! > sRect.h) {
            p = p.replace("bottom", "top") as IPlacementType;
          }
        } else if (p.indexOf("left") === 0) {
          if (chRect.left < coRect.width + offset!) {
            p = p.replace("left", "right") as IPlacementType;
          }
        } else if (p.indexOf("right") === 0) {
          if (chRect.left + chRect.width + coRect.width + offset! > sRect.w) {
            p = p.replace("right", "left") as IPlacementType;
          }
        }
      }
    }
    return p;
  }, [placement, chRect, coRect, offset, sRect]);

  const childrenPosition = React.useMemo<Interpolation>(() => {
    if (!mount) {
      return {};
    }
    let vals: Interpolation = {};
    if (chRect && coRect) {
      const w = (chRect.width - coRect.width) / 2;
      const transHeight = coRect.height + offset!;
      const transWidth = coRect.width + offset!;

      switch (fixedPlacement) {
        case "top":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(${w}px,-${transHeight}px,0)`,
          };
          break;
        case "topLeft":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(0,-${transHeight}px,0)`,
          };
          break;
        case "topRight":
          vals = {
            top: chRect.top,
            left: chRect.left + chRect.width,
            transform: `translate3d(-100%,-${transHeight}px,0)`,
          };
          break;
        case "bottom":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left,
            transform: `translate3d(${w}px,${offset!}px,0)`,
          };
          break;
        case "bottomLeft":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left,
            transform: `translate3d(0,${offset!}px,0)`,
          };
          break;
        case "bottomRight":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left + chRect.width,
            transform: `translate3d(-100%,${offset!}px,0)`,
          };
          break;
        case "left":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(-${transWidth}px,calc(${chRect.height /
              2}px - 50%),0)`,
          };
          break;
        case "leftBottom":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left,
            transform: `translate3d(-${transWidth}px,-100%,0)`,
          };
          break;
        case "leftTop":
          vals = {
            top: chRect.top,
            left: chRect.left,
            transform: `translate3d(-${transWidth}px,0,0)`,
          };
          break;
        case "right":
          vals = {
            top: chRect.top,
            left: chRect.left + chRect.width,
            transform: `translate3d(${offset!}px,calc(${chRect.height /
              2}px - 50%),0)`,
          };
          break;
        case "rightBottom":
          vals = {
            top: chRect.top + chRect.height,
            left: chRect.left + chRect.width,
            transform: `translate3d(${offset!}px,-100%,0)`,
          };
          break;
        case "rightTop":
          vals = {
            top: chRect.top,
            left: chRect.left + chRect.width,
            transform: `translate3d(${offset!}px,0,0)`,
          };
      }
      (vals.top as number) += sRect.y;
      (vals.left as number) += sRect.x;
    }
    return vals;
  }, [chRect, sRect, coRect, fixedPlacement, mount]);

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
      if (trigger === "hover") {
        childrenRef.current.addEventListener("focus", handleTriggerEvent);
        childrenRef.current.addEventListener("blur", handleTriggerEvent);
      }
      return () => {
        // remove listeners
        d.removeEventListener(eventStr, handleTriggerEvent);
        if (trigger === "hover") {
          childrenRef.current?.removeEventListener("focus", handleTriggerEvent);
          childrenRef.current?.removeEventListener("blur", handleTriggerEvent);
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
            {typeof content === "function"
              ? React.cloneElement(
                  content({
                    rect: chRect,
                    contentRect: coRect,
                    fixedPlacement,
                  }),
                  {
                    ref: contentRef,
                  }
                )
              : React.isValidElement(content)
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
  offset: 0,
};
