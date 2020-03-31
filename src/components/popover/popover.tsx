/** @jsx jsx */
import React from "react";
import { IPopperProps, Popper } from "../popper";
import { jsx, getCss } from "../theme";
import { darkenTheme } from "../utils/colors";
import { IPlacementType } from "../enum/placement";

interface IPopoverProps extends Omit<IPopperProps, "offset" | "arrow"> {
  title?: React.ReactNode;
}

export const Popover = (props: IPopoverProps) => {
  const { title, content, placement, ...rest } = props;
  const paddingStyles = React.useMemo(() => {
    return getCss({
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
    });
  }, []);

  return (
    <Popper
      {...rest}
      placement={placement}
      arrow={{ borderColor: "inputBorder", backgroundColor: "background" }}
      content={
        <div
          css={[
            getCss({
              maxWidth: "276px",
              minWidth: "128px",
              borderRadius: "default",
              border: "1px solid",
              borderColor: "inputBorder",
              backgroundColor: "background",
              position: "relative",
            }),
          ]}
        >
          {title ? (
            <div
              css={[
                paddingStyles,
                getCss({
                  background: darkenTheme("background", 0.03),
                  borderBottom: "1px solid",
                  borderBottomColor: "inputBorder",
                  borderTopRightRadius: "default",
                  borderTopLeftRadius: "default",
                  overflow: "hidden",
                }),
              ]}
            >
              {title}
            </div>
          ) : null}
          <div css={[paddingStyles]}>{content}</div>
        </div>
      }
    />
  );
};

Popover.defaultProps = {
  trigger: "click",
  placement: "bottom",
};

function Triangle(props: {
  placement: IPlacementType;
  rect: DOMRect;
  contentRect: DOMRect;
}) {
  const { placement, rect, contentRect } = props;

  const styles = React.useMemo(() => {
    const isTop = placement.indexOf("top") === 0;
    const isBottom = placement.indexOf("bottom") === 0;
    const isLeft = placement.indexOf("left") === 0;
    const isRight = placement.indexOf("right") === 0;
    const xOffset =
      placement.indexOf("Right") >= 0
        ? contentRect.width - rect.width / 2
        : placement.indexOf("Left") >= 0
        ? rect.width / 2
        : contentRect.width / 2;
    const yOffset =
      placement.indexOf("Bottom") > 0
        ? contentRect.height - rect.height / 2
        : placement.indexOf("Top") >= 0
        ? rect.height / 2
        : contentRect.height / 2;

    return {
      style: getCss({
        position: "absolute",
        top: 0,
        left: 0,
        transformOrigin: "top left",
        "&:after": {
          display: "block",
          content: "''",
          position: "absolute",
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderColor: "transparent",
          borderWidth: "8px 7px 0 7px",
          borderTopColor: "background",
          top: 0,
          left: "1px",
          zIndex: 1,
        },
        "&:before": {
          display: "block",
          content: "''",
          position: "absolute",
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderColor: "transparent",
          borderWidth: "9px 8px 0 8px",
          borderTopColor: "inputBorder",
          top: 0,
          left: 0,
          zIndex: 0,
        },
        transform: isTop
          ? `translate3d(${xOffset - 8}px,${contentRect.height - 2}px,0)`
          : isBottom
          ? `translate3d(${xOffset + 8}px,0,0) rotate(180deg)`
          : isLeft
          ? `translate3d(${contentRect.width - 2}px,${yOffset +
              8}px,0) rotate(-90deg)`
          : isRight
          ? `translate3d(${0}px,${yOffset - 8}px,0) rotate(90deg)`
          : "",
      }),
    };
  }, [placement, rect, contentRect]);

  return <div css={styles.style} />;
}
