import React from "react";
import isEqual from "lodash/isEqual";

export const useRefRect = (
  ref: React.MutableRefObject<HTMLElement | undefined>,
  deps: React.DependencyList = []
) => {
  const [rect, setRect] = React.useState<DOMRect | undefined>(
    ref.current?.getBoundingClientRect()
  );

  React.useEffect(() => {
    const newRect = ref.current?.getBoundingClientRect();
    if (newRect && !isEqual(rect, newRect)) {
      setRect(newRect);
    }
  }, [ref.current, ...deps]);

  return rect;
};
