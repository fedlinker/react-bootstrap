/** @jsx jsx */
import React, { useMemo, FunctionComponent, Fragment } from "react";
import { getCss, jsx } from "../theme";
import {
  CAROUSEL_CONTROL_COLOR,
  CAROUSEL_CONTROL_WIDTH,
} from "./styleVariables";
import { SolidChevronLeft, SolidChevronRight } from "@fedlinker/font-awesome";

interface INavigationControlProps {
  style?: "Interpolation";
  onLeftArrowClick?: () => void;
  onRightArrowClick?: () => void;
}

const NavigationControl: FunctionComponent<INavigationControlProps> = ({
  onLeftArrowClick,
  onRightArrowClick,
}) => {
  const IconSize = useMemo(
    () =>
      getCss({
        fontSize: "20px;",
      }),
    []
  );
  const navigationBaseStyle = useMemo(
    () =>
      getCss({
        position: "absolute",
        top: "0",
        bottom: "0",
        zIndex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: CAROUSEL_CONTROL_WIDTH,
        color: CAROUSEL_CONTROL_COLOR,
        textAlign: "center",
        opacity: "0.5",
        transition: "opacity .15s ease",
        "&:hover": {
          color: CAROUSEL_CONTROL_COLOR,
          textDecoration: "none",
          outline: "0",
          opacity: ".9",
        },
      }),
    []
  );

  return (
    <Fragment>
      <div style={{ left: 0 }} css={[navigationBaseStyle]}>
        <SolidChevronLeft
          css={[IconSize]}
          onClick={() => {
            onLeftArrowClick && onLeftArrowClick();
          }}
        />
      </div>
      <div style={{ right: 0 }} css={[navigationBaseStyle]}>
        <SolidChevronRight
          css={[IconSize]}
          onClick={() => {
            onRightArrowClick && onRightArrowClick();
          }}
        />
      </div>
    </Fragment>
  );
};

export default NavigationControl;
