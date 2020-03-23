/** @jsx jsx */
import React from "react";
import { IPopperProps, Popper } from "../popper";
import { jsx, getCss } from "../theme";
import { darkenTheme } from "../utils/colors";
import { IPlacementType } from "../enum/placement";

interface IPopoverProps extends Omit<IPopperProps, "offset"> {
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
      offset={8}
      content={({ rect, fixedPlacement, contentRect }) => {
        return (
          <div
            css={[
              getCss({
                maxWidth: "276px",
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
            {contentRect && (
              <Triangle
                rect={rect}
                placement={fixedPlacement}
                contentRect={contentRect}
              />
            )}
          </div>
        );
      }}
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
    const transform = `rotate(${
      isTop ? 0 : isBottom ? 180 : isLeft ? -90 : isRight ? 90 : 0
    }deg)`;
    return {
      style: getCss({
        position: "absolute",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderColor: "transparent",
        borderWidth: "9px 8px 0 8px",
        borderTopColor: "background",
        transform,
        ...(isTop
          ? {
              left:
                placement === "topRight"
                  ? `${contentRect.width - rect.width / 2 - 4}px`
                  : placement === "top"
                  ? `${contentRect.width / 2 - 4}px`
                  : `${rect.width / 2 - 4}px`,
              bottom: `-8px`,
            }
          : isBottom
          ? {
              left:
                placement === "bottomRight"
                  ? `${contentRect.width - rect.width / 2 - 4}px`
                  : placement === "bottom"
                  ? `${contentRect.width / 2 - 4}px`
                  : `${rect.width / 2 - 4}px`,
              top: "-8px",
            }
          : isLeft
          ? {
              right: "-12px",
              top:
                placement === "leftTop"
                  ? `${rect.height / 2 - 4}px`
                  : placement === "left"
                  ? `${contentRect.height / 2 - 4}px`
                  : `${contentRect.height - rect.height / 2 - 4}px`,
            }
          : isRight
          ? {
              left: "-12px",
              top:
                placement === "rightTop"
                  ? `${rect.height / 2 - 4}px`
                  : placement === "right"
                  ? `${contentRect.height / 2 - 4}px`
                  : `${contentRect.height - rect.height / 2 - 4}px`,
            }
          : {}),
      }),
      rotate: transform,
    };
  }, [placement, rect, contentRect]);

  return (
    <React.Fragment>
      <div css={styles.style} />
      <div
        css={[
          styles.style,
          getCss({
            borderTopColor: "inputBorder",
            transform: `${styles.rotate} translate3d(0,1px,0)`,
            zIndex: -1,
          }),
        ]}
      />
    </React.Fragment>
  );
}
