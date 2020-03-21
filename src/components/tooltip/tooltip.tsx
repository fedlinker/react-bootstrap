/** @jsx jsx */
import React from "react";
import { Popper, IPopperProps } from "../popper";
import { jsx, getCss } from "../theme";

export interface ITooltipProps extends IPopperProps {}

export const Tooltip = (props: ITooltipProps) => {
  const { content, placement, ...rest } = props;
  const wrapperStyles = React.useMemo(() => {
    return getCss({
      backgroundColor: "text",
      color: "background",
      position: "relative",
      padding: 2,
      borderRadius: "default",
      fontSize: 1,
    });
  }, []);

  const placementStyles = React.useMemo(() => {
    return getCss({
      marginTop: placement!.match("bottom") ? "6px" : "",
      marginLeft: placement!.match("right") ? "6px" : "",
      marginBottom: placement!.match("top") ? "6px" : "",
      marginRight: placement!.match("left") ? "6px" : "",
    });
  }, [placement]);

  const triangleStyle = React.useMemo(() => {
    const isBottom = placement!.match("bottom");
    const isTop = placement!.match("top");
    const isLeft = placement!.match("left");
    const isRight = placement!.match("right");

    return getCss({
      position: "absolute",
      backgroundColor: "text",
      color: "background",
      width: 0,
      height: 0,
      borderStyle: "solid",
      ...(isBottom
        ? {
            top: 0,
            left: "50%",
            transform: "translate3d(-50%,-100%,0)",
            borderWidth: "0 6px 6px 6px",
            borderBottomColor: "text",
          }
        : isTop
        ? {
            bottom: 0,
            left: "50%",
            transform: "translate3d(-50%,100%,0) rotate(180deg)",
            borderWidth: "0 6px 6px 6px",
            borderBottomColor: "text",
          }
        : isLeft
        ? {
            top: "50%",
            right: 0,
            transform: "translate3d(100%,-50%,0) rotate(180deg)",
            borderWidth: "6px 6px 6px 0",
            borderRightColor: "text",
          }
        : isRight
        ? {
            top: "50%",
            left: 0,
            transform: "translate3d(-100%,-50%,0)",
            borderWidth: "6px 6px 6px 0",
            borderRightColor: "text",
          }
        : {}),
    });
  }, [placement]);

  return (
    <Popper
      {...rest}
      placement={placement}
      content={
        <div css={[wrapperStyles, placementStyles]}>
          <div css={triangleStyle} />
          <div>{content}</div>
        </div>
      }
    />
  );
};

Tooltip.defaultProps = {
  placement: "bottom",
};
