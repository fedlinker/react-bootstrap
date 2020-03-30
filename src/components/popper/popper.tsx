/** @jsx jsx */
import React, { CSSProperties } from "react";
import { Placement, Modifiers } from "popper.js";
import { animated, useSpring, UseSpringProps } from "react-spring";
import { easeCubicInOut } from "d3-ease";
import { Manager, Reference, Popper as PopperJSPopper } from "react-popper";
import { Portal } from "../portal";
import { jsx, Interpolation, getCss } from "../theme";

export type IPopperTriggerType = "hover" | "click";
export interface IDelayObject {
  show: number;
  hide: number;
}

export type IContentRenderPropsType = (props: {
  rect: DOMRect;
  contentRect?: DOMRect;
  fixedPlacement: Placement;
}) => React.ReactNode;

export interface IPopperProps {
  placement?: Placement;
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
    placement: Placement;
  }): UseSpringProps<CSSProperties>;

  /**
   * if the value is false, popper content will not be rendered in portal.
   * default value is false.
   */
  inline?: boolean;

  modifiers?: Modifiers;

  arrowStyle?: Interpolation;
}

export const Popper: React.SFC<IPopperProps> = props => {
  const {
    placement,
    content,
    trigger,
    delay,
    children,
    contentContainerStyle,
    disabled,
    animationFunc,
    inline,
    modifiers,
    arrowStyle,
  } = props;

  const [visible, setVisible] = React.useState(false);
  const [mount, setMount] = React.useState(false);

  const childrenRef = React.useRef<HTMLElement>();
  const contentRef = React.useRef<HTMLElement>();

  /** animation timer */
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  /** leave and enter animations */
  const contentAnimation = useSpring({
    opacity: visible ? 1 : 0,
    config: { easing: easeCubicInOut, duration: 200 },
    delay:
      typeof delay === "number" ? delay : visible ? delay?.show : delay?.hide,
    ...(typeof animationFunc === "function"
      ? animationFunc({ visible, delay: delay!, placement: placement! })
      : {}),
  });

  React.useEffect(() => {
    const chEl = childrenRef.current;
    const coEl = contentRef.current;
    if (disabled) {
      return;
    }
    // show the popper content
    const setShow = () => {
      setVisible(true);
    };
    // hide the popper content
    const setHide = () => {
      setVisible(false);
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
        (chEl && chEl.contains(e.target)) || (coEl && coEl.contains(e.target));

      // when focus, stop other event
      if (isContained) {
        setShow();
      } else {
        setHide();
      }
    };

    if (childrenRef.current) {
      const eventStr = trigger === "hover" ? "mousemove" : "click";

      // when blured, hide the popper content
      d.addEventListener(eventStr, handleTriggerEvent);
      if (trigger === "hover") {
        childrenRef.current.addEventListener("blur", handleTriggerEvent);
      }
      return () => {
        // remove listeners
        d.removeEventListener(eventStr, handleTriggerEvent);
        if (trigger === "hover") {
          childrenRef.current?.removeEventListener("blur", handleTriggerEvent);
        }
      };
    }
    return;
  }, [children, childrenRef.current, visible, mount, trigger]);

  React.useEffect(() => {
    if (visible) {
      if (mount) {
        return;
      }
      setMount(true);
    } else {
      if (!mount) {
        return;
      }
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      timer.current = setTimeout(() => {
        setMount(false);
        timer.current = null;
      }, 200);
    }
  }, [visible]);

  const WrapperComp = React.useMemo(() => {
    if (inline) {
      return React.Fragment;
    } else {
      return Portal;
    }
  }, [inline]);

  return (
    <Manager>
      <Reference innerRef={childrenRef}>
        {({ ref }) => {
          if (React.isValidElement(children)) {
            return React.cloneElement(children, { ref });
          }
          return null;
        }}
      </Reference>
      {mount ? (
        <WrapperComp>
          <PopperJSPopper
            placement={placement}
            innerRef={contentRef}
            modifiers={modifiers}
          >
            {({ ref, style, arrowProps, placement }) => {
              return (
                <div
                  style={style}
                  ref={ref}
                  data-placement={placement}
                  css={[contentContainerStyle]}
                >
                  <animated.div style={contentAnimation}>
                    {content}
                    {arrowStyle ? (
                      <div
                        ref={arrowProps.ref}
                        style={arrowProps.style}
                        data-placement={placement}
                        css={arrowStyle}
                      />
                    ) : null}
                  </animated.div>
                </div>
              );
            }}
          </PopperJSPopper>
        </WrapperComp>
      ) : null}
    </Manager>
  );
};

Popper.defaultProps = {
  placement: "bottom",
  trigger: "hover",
  delay: 0,
  inline: false,
};

// position: "absolute",
// top: 0,
// left: 0,
// ":after": {
//   content: "''",
//   position: "absolute",
//   backgroundColor: "text",
//   color: "background",
//   width: 0,
//   height: 0,
//   borderStyle: "solid",
//   borderWidth: "0 6px 6px 6px",
//   borderBottomColor: "text",
