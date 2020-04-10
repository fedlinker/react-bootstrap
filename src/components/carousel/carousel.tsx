/** @jsx jsx */
import React, { useMemo, FunctionComponent, useState, useEffect } from "react";
import { getCss, jsx } from "../theme";
import { animated, useTransition } from "react-spring";
import NavigationControl from "./navigationControl";

const carouselStyle = getCss({
  position: "relative",
  width: "300px",
  height: "300px",
  overflow: "hidden",
  // display: "inline-block",
});

export interface ICarouselProps {
  style?: "Interpolation";
  defaultActiveIndex?: number;
  navigationControl?: boolean;
}

const timerSequence: number[] = [];
export const Carousel: FunctionComponent<ICarouselProps> = ({
  children,
  navigationControl,
  style,
}) => {
  const [index, setIndex] = useState(0);
  const slideTransitions = useTransition(index, null, {
    from: { opacity: 0.8, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0.8, transform: "translate3d(-100%, 0, 0)" },
    config: { duration: 650 },
    // unique: true
  });

  useEffect(() => {
    if (timerSequence.length > 0) {
      window.clearTimeout(timerSequence.pop());
    }
    const indexTimer = window.setTimeout(() => {
      setIndex(index + 1);
    }, 3500);
    timerSequence.push(indexTimer);
  }, [index]);

  const childrenArray = React.Children.toArray(children);
  const { length: childrenCount } = childrenArray;
  return (
    <div css={[carouselStyle, style]}>
      {slideTransitions.map(({ item, key, props }) =>
        childrenArray.map(
          (child, childIndex) =>
            item % childrenCount === childIndex && (
              <animated.div key={key} style={props}>
                {child}
              </animated.div>
            )
        )
      )}
      {navigationControl && (
        <NavigationControl
          onLeftArrowClick={() => {
            setIndex(index - 1);
          }}
          onRightArrowClick={() => {
            setIndex(index + 1);
          }}
        />
      )}
    </div>
  );
};
