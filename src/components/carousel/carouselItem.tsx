/** @jsx jsx */
import React, {
  useMemo,
  FunctionComponent,
  useState,
  Fragment,
  ReactNode,
} from "react";
import { getCss, jsx, Interpolation } from "../theme";

const carouselItemStyle = getCss({
  position: "absolute",
});

interface ICarouselItemProps {
  style?: Interpolation;
}

export const CarouselItem: FunctionComponent<ICarouselItemProps> = ({
  children,
  style,
}) =>
  children ? (
    <div css={[carouselItemStyle, style]}>{children}</div>
  ) : (
    <Fragment />
  );
