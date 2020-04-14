/** @jsx jsx */
import React, { useMemo, FunctionComponent, useState, useEffect } from "react";
import { getCss, jsx } from "../theme";
import { animated, useTransition } from "react-spring";
import NavigationControl from "./navigationControl";
import Indicators from "./indicators";

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
  enableNavigationControl?: boolean;
  enableIndicators?: boolean;
  interval?: number; // millisecond
}

const timerSequence: number[] = [];
export const Carousel: FunctionComponent<ICarouselProps> = ({
  children,
  enableNavigationControl,
  style,
  enableIndicators,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const childrenArray = React.Children.toArray(children);
  const { length: childrenCount } = childrenArray;

  const slideTransitions = useTransition(index, null, {
    from: { opacity: 0.8, transform: `translate3d(${direction * 100}%, 0, 0)` },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: {
      opacity: 0.8,
      transform: `translate3d(${direction * -100}%, 0, 0)`,
    },
    config: { duration: 650 },
    // unique: true
  });

  useEffect(() => {
    if (timerSequence.length > 0) {
      window.clearTimeout(timerSequence.pop());
    }
    const indexTimer = window.setTimeout(() => {
      setIndex((index + 1) % childrenCount);
    }, 3500);
    timerSequence.push(indexTimer);
  }, [index]);
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
      {enableNavigationControl && (
        <NavigationControl
          onLeftArrowClick={() => {
            setIndex(index - 1);
            setDirection(-1);
          }}
          onRightArrowClick={() => {
            setIndex(index + 1);
            setDirection(1);
          }}
        />
      )}
      {enableIndicators && (
        <Indicators
          count={childrenCount}
          activeIndex={index}
          controlActiveTab={setIndex}
          controlDirection={setDirection}
        />
      )}
    </div>
  );
};
