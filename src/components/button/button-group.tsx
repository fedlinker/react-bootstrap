/** @jsx jsx */
import React from "react";
import { jsx } from "..";
import map from "lodash/map";
import { IButtonProps, IButtonTypeKey } from "./button";
import { Interpolation } from "../theme";
import { ISizeType } from "../enum/size";

export interface IButtonGroupProps {
  size?: ISizeType;
  style?: Interpolation;
  type?: IButtonTypeKey;
  outline?: boolean;
  children?: Array<React.ReactElement<IButtonProps>>;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, IButtonGroupProps>(
  (props, ref) => {
    const { children, size, style, type, outline } = props;
    return (
      <div ref={ref} css={[style]}>
        {map(children, (o, i) => {
          if (children == null) {
            return children;
          }
          if (!React.isValidElement(o)) {
            return null;
          }
          const isFirst = i === 0;
          const isLast = i === children.length - 1;
          const leftRadius = isFirst ? "" : "0px";
          const rightRadius = isLast ? "" : "0px";
          return React.cloneElement(o, {
            style: {
              borderTopLeftRadius: leftRadius,
              borderBottomLeftRadius: leftRadius,
              borderTopRightRadius: rightRadius,
              borderBottomRightRadius: rightRadius,
              ...(outline
                ? {
                    borderRight: isLast ? "" : "none",
                  }
                : {}),
            },
            outline,
            size,
            type: type || o.props.type,
            key: i,
          });
        })}
      </div>
    );
  }
);
