/** @jsx jsx */
import React from "react";
import { Popper, IPopperProps } from "../popper";
import { jsx, getCss } from "../theme";

export interface ITooltipProps
  extends Omit<IPopperProps, "modifiers" | "arrow"> {}

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
      arrow={{ borderColor: "text", backgroundColor: "text" }}
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
