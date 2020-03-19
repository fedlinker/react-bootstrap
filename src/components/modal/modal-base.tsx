/** @jsx jsx */
import React, { useEffect, useMemo, useState } from "react";
import { Portal } from "../portal";
import { jsx, Interpolation, getCss } from "../theme";
import { getScrollbarWidth } from "../utils/getScrollbarWidth";
import { animated, useSpring } from "react-spring";
import { easeBackOut } from "d3-ease";
import { Global } from "@emotion/react";

export interface IModalBaseProps {
  /** whether the modal is opened */
  open?: boolean;
  children?: React.ReactNode;

  /** mask */
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: Interpolation;

  /** called when the modal needs to be closed */
  onClose?(): void;

  /** life cycles */
  onOpen?(): void;
  onOpened?(): void;
  onExit?(): void;
  onExited?(): void;
}

const DURATION_TIME = 400;

export const ModalBase = React.forwardRef<HTMLDivElement, IModalBaseProps>(
  (props, ref) => {
    const {
      children,
      open,
      mask,
      maskStyle,
      maskClosable,
      onClose,
      onOpen,
      onOpened,
      onExit,
      onExited,
    } = props;
    const [mount, setMount] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const scrollbarWidth = useMemo(() => {
      return getScrollbarWidth();
    }, []);

    const maskAnimation = useSpring({
      opacity: open ? 0.5 : 0,
      config: { duration: 150 },
    });

    const bodyAnimation = useSpring({
      opacity: open ? 1 : 0,
      transform: open
        ? "translate3d(-50%, -50%, 0)"
        : "translate3d(-50%, -100%, 0)",
      delay: open ? 0 : 100,
      config: {
        duration: DURATION_TIME,
        easing: easeBackOut,
      },
    });

    const basicStyles: Interpolation = useMemo(() => {
      return getCss({
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        color: "text",
      });
    }, []);

    useEffect(() => {
      if (open) {
        setIsMounted(true);
        onOpen && onOpen();
        setMount(true);
        setTimeout(() => {
          onOpened && onOpened();
        }, DURATION_TIME);
      } else {
        if (!isMounted) {
          return;
        }
        onExit && onExit();
        setTimeout(() => {
          onExited && onExited();
          setMount(false);
        }, DURATION_TIME);
      }
    }, [open]);

    return (
      <Portal>
        {mount ? (
          <div css={[basicStyles, { zIndex: 999 }]} ref={ref}>
            <animated.div
              style={bodyAnimation}
              css={[
                {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate3d(-50%, -50%, 0)",
                  zIndex: 1000,
                  maxHeight: "80%",
                  width: "600px",
                },
                getCss({
                  backgroundColor: "background",
                  borderRadius: "sm",
                  border: "1px solid",
                  borderColor: "border",
                }),
              ]}
            >
              {children}
            </animated.div>

            {mask && (
              <animated.div
                style={maskAnimation}
                css={[
                  basicStyles,
                  getCss({
                    backgroundColor: "#000",
                    zIndex: 999,
                    position: "absolute",
                  }),
                  maskStyle,
                ]}
                onClick={maskClosable ? onClose : undefined}
              />
            )}
            <Global
              styles={{
                body: {
                  overflow: "hidden",
                  paddingRight: `${scrollbarWidth}px`,
                },
              }}
            />
          </div>
        ) : null}
      </Portal>
    );
  }
);

ModalBase.defaultProps = {
  mask: true,
  maskClosable: true,
};
