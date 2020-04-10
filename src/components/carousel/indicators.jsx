/** @jsx jsx */
import React, { useMemo, FunctionComponent, useState, useEffect } from "react";
import { getCss, jsx } from "../theme";
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
  marginLeft: CAROUSEL_CONTROL_WIDT,
  listStyle: "none",
});

const indicatorsListStyles = getCss({
  boxSizing: "contentBox",
  flex: "0 1 auto",
  width: CAROUSEL_INDICATOR_WIDTH,
  height: CAROUSEL_INDICATOR_HEIGHT,
  marginRight: CAROUSEL_INDICATOR_SPACER,
  marginLeft: CAROUSEL_INDICATOR_SPACERr,
  textIndent: "-999px",
  cursor: "pointer",
  backgroundColor: CAROUSEL_INDICATOR_ACTIVE_BG,
  backgroundClip: "padding-box",
  // Use transparent borders to increase the hit area by 10px on top and bottom.
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  opacity: ".5",
  transition: "opacity .6s ease",
});
