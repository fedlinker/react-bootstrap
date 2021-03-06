/** @jsx jsx */
import React, { useMemo } from "react";
import { jsx, Interpolation, getCss } from "../theme";

type IColsValue = number | string | undefined;
type IColsType = IColsValue | IColsValue[];

export interface IColProps {
  cols?: IColsType;
  style?: Interpolation;
  children?: React.ReactNode;
}

// every row has 24 columns.
export const BASE_COLUMN_SIZE = 24;
const defaultFlexBasis: Array<string | 1> = ["100%", 1, 1, 1, 1];
const calculateColsValue = (cols: IColsValue) => {
  if (typeof cols === "number") {
    // calculate the percent of every column.
    return `${(cols / BASE_COLUMN_SIZE) * 100}%`;
  } else if (typeof cols === "string") {
    return cols;
  } else {
    return 1;
  }
};

export const Col: React.SFC<IColProps> = props => {
  const { children, style = {}, cols } = props;

  const flexBasis = useMemo(() => {
    if (cols) {
      if (Array.isArray(cols)) {
        return cols.map((o: IColsValue) => calculateColsValue(o));
      } else {
        return calculateColsValue(cols);
      }
    } else {
      return defaultFlexBasis;
    }
  }, [cols]);

  const width = useMemo(() => {
    const calWidth = (w: string | 1) => {
      return w === 1 ? "" : w;
    };
    if (Array.isArray(flexBasis)) {
      return flexBasis.map(o => calWidth(o));
    } else {
      return calWidth(flexBasis);
    }
  }, [flexBasis]);

  return (
    <div
      css={[
        {
          flexGrow: 1,
          flexShrink: 1,
        },
        style,
        getCss({ width, flexBasis }),
      ]}
    >
      {children}
    </div>
  );
};

Col.defaultProps = {
  style: {},
};
