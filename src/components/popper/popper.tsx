/** @jsx jsx */
import React, { CSSProperties } from "react";
import { Placement, Modifier } from "@popperjs/core";
import { animated, useSpring, UseSpringProps } from "react-spring";
import { easeCubicInOut } from "d3-ease";
import { Portal } from "../portal";
import { jsx, Interpolation, getCss } from "../theme";
import { usePopper } from "./usePopper";

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

  modifiers?: Array<Partial<Modifier<any>>>;

  arrow?: {
    borderColor: string;
    backgroundColor: string;
  };
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
    arrow,
  } = props;

  const [visible, setVisible] = React.useState(false);
  const [mount, setMount] = React.useState(false);
  const { popper, reference } = usePopper<
    HTMLElement,
    HTMLDivElement,
    HTMLDivElement
  >(
    {
      placement: placement!,
      strategy: "absolute",
      modifiers: modifiers!,
      hasArrow: !!arrow,
    },
    [mount]
  );

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
    const chEl = reference.current;
    const coEl = popper.current;
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
    const d = chEl?.ownerDocument?.documentElement || document.documentElement;

    const handleTriggerEvent = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }
      // true: the event target is contained in content or children.
      const isContained =
        (chEl && chEl.contains(e.target)) || (coEl && coEl.contains(e.target));

      // when focus, stop other event
      if (isContained) {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        setShow();
      } else {
        setHide();
      }
    };

    if (chEl) {
      const eventStr = trigger === "hover" ? "mousemove" : "click";

      // when blured, hide the popper content
      d.addEventListener(eventStr, handleTriggerEvent);
      if (trigger === "hover") {
        chEl.addEventListener("blur", handleTriggerEvent);
      }
      return () => {
        // remove listeners
        d.removeEventListener(eventStr, handleTriggerEvent);
        if (trigger === "hover") {
          chEl?.removeEventListener("blur", handleTriggerEvent);
        }
      };
    }
    return;
  }, [children, visible, mount, trigger]);

  const arrowStyles = React.useMemo(() => {
    if (!arrow) {
      return {};
    }
    const { borderColor: bc, backgroundColor: bgc } = arrow;
    return getCss({
      "&[data-popper-placement*='bottom']": {
        ".bs-popper-arrow": {
          left: 0,
          top: "-8px",
          "&::before,&::after": {
            borderWidth: "0 8px 8px 8px",
            borderColor: "transparent",
          },
          "&::before": {
            top: "1px",
            borderBottomColor: bgc,
          },
          "&::after": {
            borderBottomColor: bc,
          },
        },
      },
      "&[data-popper-placement*='top']": {
        ".bs-popper-arrow": {
          bottom: "-16px",
          left: 0,
          "&::before,&::after": {
            borderWidth: "8px 8px 0 8px",
            borderColor: "transparent",
            borderTopColor: "background",
          },
          "&::before": {
            bottom: "9px",
            borderTopColor: bgc,
          },
          "&::after": {
            borderTopColor: bc,
          },
        },
      },
      "&[data-popper-placement*='right']": {
        ".bs-popper-arrow": {
          left: "-8px",
          top: 0,
          "&::before,&::after": {
            borderWidth: "8px 8px 8px 0",
            borderColor: "transparent",
          },
          "&::before": {
            left: "1px",
            borderRightColor: bgc,
          },
          "&::after": {
            borderRightColor: bc,
          },
        },
      },
      "&[data-popper-placement*='left']": {
        ".bs-popper-arrow": {
          right: "-16px",
          top: 0,
          "&::before,&::after": {
            borderWidth: "8px 0 8px 8px",
            borderColor: "transparent",
          },
          "&::before": {
            right: "9px",
            borderLeftColor: bgc,
          },
          "&::after": {
            borderLeftColor: bc,
          },
        },
      },
      ".bs-popper-arrow": {
        position: "absolute",
        width: "16px",
        height: "16px",
        "&::before,&::after": {
          content: "''",
          display: "block",
          borderStyle: "solid",
          position: "absolute",
        },
        "&::after": {
          zIndex: -1,
          top: 0,
          left: 0,
        },
      },
    });
  }, [arrow]);

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
    <React.Fragment>
      {React.isValidElement(children)
        ? React.cloneElement(children, { ref: reference })
        : null}
      {mount ? (
        <WrapperComp>
          <div ref={popper} css={[contentContainerStyle, arrowStyles]}>
            <animated.div style={contentAnimation}>
              {content}
              {arrow ? (
                <div className="bs-popper-arrow" data-popper-arrow />
              ) : null}
            </animated.div>
          </div>
        </WrapperComp>
      ) : null}
    </React.Fragment>
  );
};

Popper.defaultProps = {
  placement: "bottom",
  trigger: "hover",
  delay: 0,
  inline: false,
  modifiers: [],
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
