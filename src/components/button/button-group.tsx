/** @jsx jsx */
import React from "react";
import { jsx } from "..";
import map from "lodash/map";
import { IButtonProps, IButtonTypeKey } from "./button";
import { Interpolation, getCss } from "../theme";
import { ISizeType } from "../enum/size";

export interface IButtonGroupProps {
  size?: ISizeType;
  style?: Interpolation;
  type?: IButtonTypeKey;
  outline?: boolean;
  children?:
    | Array<React.ReactElement<IButtonProps>>
    | React.ReactElement<IButtonProps>;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, IButtonGroupProps>(
  (props, ref) => {
    const { children, size, style, type, outline } = props;
    const childrenEls = React.useMemo(() => {
      return Array.isArray(children) ? children : [children];
    }, [children]);

    const baseStyles = React.useMemo(() => {
      return getCss({ display: "inline-block" });
    }, []);

    return (
      <div ref={ref} css={[baseStyles, style]}>
        {map(childrenEls, (o, i) => {
          if (children == null) {
            return children;
          }
          if (!React.isValidElement(o)) {
            return null;
          }
          const isFirst = i === 0;
          const isLast = i === childrenEls.length - 1;
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
