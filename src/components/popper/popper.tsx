/** @jsx jsx */
import React, { CSSProperties } from "react";
import { animated, useSpring, UseSpringProps } from "react-spring";
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

  /**
   * disable the popper content
   */
  disabled?: boolean;

  contentContainerStyle?: Interpolation;

  /**
   * customize animation of showing and hiding.
   * @param value animation state
   */
  animationFunc?(value: {
    visible: boolean;
    delay: number | IDelayObject;
    placement: IPlacementType;
  }): UseSpringProps<CSSProperties>;
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
    contentContainerStyle,
    disabled,
    animationFunc,
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
  }, [mount]);
  // children rect
  const chRect = useRefRect(childrenRef, [mount]);
  // content rect
  const coRect = useRefRect(contentRef, [mount]);

  /** animation timer */
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  // fix the placement based on rect
  const fixedPlacement = React.useMemo(() => {
    let p = placement!;
    if (chRect && coRect) {
      // fix the placement based on rect
      if (autoFixPlacement) {
        if (p.indexOf("top") === 0) {
          if (coRect.left < 0) {
            p = "topLeft";
          }
          if (coRect.left + coRect.width > sRect.w) {
            p = "topRight";
          }
          if (chRect.top < coRect.height + offset!) {
            p = p.replace("top", "bottom") as IPlacementType;
          }
        } else if (p.indexOf("bottom") === 0) {
          if (coRect.left < 0) {
            p = "bottomLeft";
          }
          if (coRect.left + coRect.width > sRect.w) {
            p = "bottomRight";
          }
          if (chRect.top + chRect.height + coRect.height + offset! > sRect.h) {
            p = p.replace("bottom", "top") as IPlacementType;
          }
        } else if (p.indexOf("left") === 0) {
          if (coRect.top < 0) {
            p = "leftTop";
          }
          if (coRect.top + coRect.height > sRect.h) {
            p = "leftBottom";
          }
          if (chRect.left < coRect.width + offset!) {
            p = p.replace("left", "right") as IPlacementType;
          }
        } else if (p.indexOf("right") === 0) {
          if (coRect.top < 0) {
            p = "rightTop";
          }
          if (coRect.top + coRect.height > sRect.h) {
            p = "rightBottom";
          }
          if (chRect.left + chRect.width + coRect.width + offset! > sRect.w) {
            p = p.replace("right", "left") as IPlacementType;
          }
        }
      }
    }
    return p;
  }, [placement, chRect, coRect, offset, sRect]);

  /** leave and enter animations */
  const contentAnimation = useSpring({
    opacity: visible ? 1 : 0,
    config: { easing: easeCubicInOut, duration: 200 },
    delay:
      typeof delay === "number" ? delay : visible ? delay?.show : delay?.hide,
    ...(typeof animationFunc === "function"
      ? animationFunc({ visible, delay: delay!, placement: fixedPlacement })
      : {}),
  });

  const contentPositionStyle = React.useMemo<Interpolation>(() => {
    if (!mount) {
      return {};
    }
    let vals: Interpolation = { top: 0, left: 0 };
    if (chRect && coRect) {
      const w = (chRect.width - coRect.width) / 2;
      const transHeight = coRect.height + offset!;
      const transWidth = coRect.width + offset!;

      switch (fixedPlacement) {
        case "top":
          vals.transform = `translate3d(${w + chRect.left}px,${chRect.top -
            transHeight}px,0)`;
          break;
        case "topLeft":
          vals.transform = `translate3d(${chRect.left}px,${chRect.top -
            transHeight}px,0)`;
          break;
        case "topRight":
          vals.transform = `translate3d(${chRect.left +
            chRect.width -
            coRect.width}px,${chRect.top - transHeight}px,0)`;
          break;
        case "bottom":
          vals.transform = `translate3d(${w + chRect.left}px,${chRect.top +
            chRect.height +
            offset!}px,0)`;
          break;
        case "bottomLeft":
          vals.transform = `translate3d(${chRect.left}px,${chRect.top +
            chRect.height +
            offset!}px,0)`;
          break;
        case "bottomRight":
          vals.transform = `translate3d(${chRect.left +
            chRect.width -
            coRect.width}px,${chRect.top + chRect.height + offset!}px,0)`;
          break;
        case "left":
          vals.transform = `translate3d(${chRect.left -
            transWidth}px,${chRect.top +
            (chRect.height - coRect.height) / 2}px,0)`;
          break;
        case "leftBottom":
          vals.transform = `translate3d(${chRect.left -
            transWidth}px,${chRect.top + chRect.height - coRect.height}px,0)`;
          break;
        case "leftTop":
          vals.transform = `translate3d(${chRect.left - transWidth}px,${
            chRect.top
          }px,0)`;
          break;
        case "right":
          vals.transform = `translate3d(${chRect.left +
            chRect.width +
            offset!}px,${chRect.top +
            (chRect.height - coRect.height) / 2}px,0)`;
          break;
        case "rightBottom":
          vals.transform = `translate3d(${chRect.left +
            chRect.width +
            offset!}px,${chRect.top + chRect.height - coRect.height}px,0)`;
          break;
        case "rightTop":
          vals.transform = `translate3d(${chRect.left +
            chRect.width +
            offset!}px,${chRect.top}px,0)`;
      }
      (vals.top as number) += sRect.y;
      (vals.left as number) += sRect.x;
    }
    return vals;
  }, [chRect, sRect, coRect, fixedPlacement, mount]);

  React.useEffect(() => {
    if (disabled) {
      return;
    }
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
  }, [children, childrenRef.current, visible, mount, timer.current, trigger]);

  return (
    <React.Fragment>
      {React.isValidElement(children)
        ? React.cloneElement(children, { ref: childrenRef })
        : null}
      <Portal>
        {mount && chRect ? (
          <div
            css={[
              {
                position: "absolute",
                boxSizing: "border-box",
              },
              contentPositionStyle,
              contentContainerStyle,
            ]}
          >
            <animated.div style={contentAnimation}>
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
          </div>
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
