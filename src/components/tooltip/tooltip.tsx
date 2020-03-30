/** @jsx jsx */
import React from "react";
import { Popper, IPopperProps } from "../popper";
import { jsx, getCss } from "../theme";

export interface ITooltipProps
  extends Omit<IPopperProps, "modifiers" | "arrowStyle"> {}

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

  return (
    <Popper
      {...rest}
      placement={placement}
      arrowStyle={getCss({
        position: "absolute",
        textAlign: "center",
        "&[data-placement*='bottom']": {
          top: 0,
          left: 0,
          width: "16px",
          height: "8px",
          marginTop: "-8px",
          "&::before": {
            borderWidth: "0 8px 8px 8px",
            borderColor: "transparent",
            borderBottomColor: "text",
          },
        },
        "&[data-placement*='top']": {
          bottom: 0,
          left: 0,
          width: "16px",
          height: "8px",
          marginBottom: "-8px",
          "&::before": {
            borderWidth: "8px 8px 0 8px",
            borderColor: "transparent",
            borderTopColor: "text",
          },
        },
        "&[data-placement*='right']": {
          left: 0,
          height: "16px",
          width: "8px",
          marginLeft: "-8px",
          "&::before": {
            borderWidth: "8px 8px 8px 0",
            borderColor: "transparent",
            borderRightColor: "text",
          },
        },
        "&[data-placement*='left']": {
          right: 0,
          height: "16px",
          width: "8px",
          marginRight: "-8px",
          "&::before": {
            borderWidth: "8px 0 8px 8px",
            borderColor: "transparent",
            borderLeftColor: "text",
          },
        },
        "&::before": {
          content: "''",
          position: "absolute",
          margin: "auto",
          display: "block",
          width: 0,
          height: 0,
          borderStyle: "solid",
        },
      })}
      modifiers={{
        preventOverflow: {
          padding: 8,
        },
        offset: {
          fn: data => {
            const { offsets, placement } = data;
            const { popper } = offsets;
            const isBottom = placement.indexOf("bottom") === 0;
            const isTop = placement.indexOf("top") === 0;
            const isLeft = placement.indexOf("left") === 0;
            const isRight = placement.indexOf("right") === 0;
            return {
              ...data,
              offsets: {
                ...offsets,
                popper: {
                  ...popper,
                  top: popper.top + (isBottom ? 8 : isTop ? -8 : 0),
                  left: popper.left + (isRight ? 8 : isLeft ? -8 : 0),
                },
              },
            };
          },
        },
      }}
      content={
        <div css={[wrapperStyles]}>
          <div>{content}</div>
        </div>
      }
    />
  );
};

Tooltip.defaultProps = {
  placement: "bottom",
};
