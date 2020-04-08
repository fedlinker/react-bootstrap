/** @jsx jsx */
import React, {
  useMemo,
  FunctionComponent,
  ReactComponentElement,
  useState,
  Fragment,
  useEffect,
} from "react";
import { getCss, jsx, BASE_COLORS, Interpolation } from "../theme";
import { animated, useTransition } from "react-spring";

const carouselStyle = getCss({
  position: "relative",
  //width: "300px",
  height: "300px",
  overflow: "hidden",
  display: "inline-block",
});

export interface ICarouselProps {
  style?: "Interpolation";
  defaultActiveIndex?: number;
}

export const Carousel: FunctionComponent<ICarouselProps> = ({
  children,
  style,
}) => {
  const [index, setIndex] = useState(0);
  const slideTransitions = useTransition(index, null, {
    from: { opacity: 0.7, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0.7, transform: "translate3d(-100%, 0, 0)" },
    config: { duration: 800 },
    // unique: true
  });
  useEffect(() => {
    setTimeout(() => {
      setIndex(index + 1);
    }, 4500);
    // return () => {clearTimeout(timer)}
  }, [index]);
  const childrenArray = React.Children.toArray(children);
  return (
    <div css={[carouselStyle]}>
      {slideTransitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          {childrenArray[index % 2]}
        </animated.div>
      ))}
    </div>
  );
};
