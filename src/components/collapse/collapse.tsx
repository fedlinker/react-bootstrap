/** @jsx jsx */
import React from "react";
import { useSpring, animated } from "react-spring";
import { easeCubicInOut } from "d3-ease";
import { useRefRect } from "../hooks";
import { jsx } from "../theme";
import { useMounted } from "../hooks/use-mounted";

export interface ICollapseProps {
  /**
   * whether the collapse content is visible.
   */
  show?: boolean;

  defaultShow?: boolean;

  children?: React.ReactNode;

  /**
   * callback when the hide event start
   */
  onHide?(): void;

  /**
   * callback when the hide event end
   */
  onHidden?(): void;

  /**
   * callback when the show event start
   */
  onShow?(): void;

  /**
   * callback when the show event end
   */
  onShown?(): void;
}

const DEFAULT_DURATION = 300;

export const Collapse = (props: ICollapseProps) => {
  const {
    show,
    defaultShow,
    children,
    onHide,
    onHidden,
    onShow,
    onShown,
  } = props;
  const [innerShow, setInnerShow] = React.useState<boolean>(
    show == null ? defaultShow! : show
  );
  const isMounted = useMounted();
  const [isShown, setIsShown] = React.useState<boolean>(innerShow);

  const ref = React.useRef<HTMLDivElement>(null);
  const rect = useRefRect(ref, [innerShow, children]);
  const showTimer = React.useRef<NodeJS.Timeout | null>(null);
  const hideTimer = React.useRef<NodeJS.Timeout | null>(null);

  const animation = useSpring({
    height: innerShow ? rect?.height || "auto" : 0,
    opacity: innerShow ? 1 : 0,
    config: { duration: DEFAULT_DURATION, easing: easeCubicInOut },
  });

  React.useEffect(() => {
    if (show == null) {
      return;
    }
    setInnerShow(show);
  }, [show]);

  React.useLayoutEffect(() => {
    if (!isMounted) {
      return;
    }
    // clear timers
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }

    if (innerShow) {
      onShow && onShow();
      showTimer.current = setTimeout(() => {
        onShown && onShown();
        setIsShown(true);
      }, DEFAULT_DURATION);
    } else {
      onHide && onHide();
      setIsShown(false);
      hideTimer.current = setTimeout(() => {
        onHidden && onHidden();
      }, DEFAULT_DURATION);
    }
  }, [innerShow]);

  return (
    <animated.div
      css={{
        overflow: "hidden",
        height: isShown ? "auto!important" : undefined,
      }}
      style={animation}
    >
      <div ref={ref}>{children}</div>
    </animated.div>
  );
};

Collapse.defaultProps = {
  defaultShow: false,
};
