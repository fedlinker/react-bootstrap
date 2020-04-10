/** @jsx jsx */
import React, {
  useMemo,
  FunctionComponent,
  Fragment,
  useState,
  useEffect,
} from "react";
import { getCss, Interpolation, jsx } from "../theme";
import {
  CAROUSEL_CONTROL_WIDTH,
  CAROUSEL_INDICATOR_WIDTH,
  CAROUSEL_INDICATOR_HEIGHT,
  CAROUSEL_INDICATOR_SPACER,
  CAROUSEL_INDICATOR_ACTIVE_BG,
} from "./styleVariables";

const indicatorsBaseStyles = getCss({
  position: "absolute",
  right: "0",
  bottom: "0",
  left: "0",
  zIndex: "15",
  display: "flex",
  justifyContent: "center",
  paddingLeft: "0",
  marginRight: CAROUSEL_CONTROL_WIDTH,
  marginLeft: CAROUSEL_CONTROL_WIDTH,
  listStyle: "none",
});

const indicatorsListStyles = getCss({
  flex: "0 1 auto",
  width: CAROUSEL_INDICATOR_WIDTH,
  height: CAROUSEL_INDICATOR_HEIGHT,
  marginRight: CAROUSEL_INDICATOR_SPACER,
  marginLeft: CAROUSEL_INDICATOR_SPACER,
  textIndent: "-999px",
  cursor: "pointer",
  backgroundColor: CAROUSEL_INDICATOR_ACTIVE_BG,
  backgroundClip: "padding-box",
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  opacity: ".5",
  transition: "opacity .6s ease",
  boxSizing: "content-box",
});

interface IIndicatorsProps {
  count: number;
}

const Indicators: FunctionComponent<IIndicatorsProps> = ({ count }) => {
  const emptyArray = new Array(count).fill(null);
  return (
    <ol css={[indicatorsBaseStyles]}>
      {emptyArray.map(() => (
        <li css={[indicatorsListStyles]}></li>
      ))}
    </ol>
  );
};

export default Indicators;
