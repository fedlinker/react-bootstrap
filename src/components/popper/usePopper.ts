import React from "react";
import { createPopper } from "@popperjs/core";
import { Options, Instance } from "@popperjs/core";

export const usePopper = <
  Reference extends Element = HTMLElement,
  Popper extends HTMLElement = HTMLElement,
  Arrow extends HTMLElement = HTMLElement
>(
  options: Options & { hasArrow?: boolean },
  deps: any[] = []
) => {
  const { hasArrow = false } = options;
  const referenceRef = React.useRef<Reference | null>(null);
  const popperRef = React.useRef<Popper | null>(null);
  const arrowRef = React.useRef<Arrow | null>(null);
  const instanceRef = React.useRef<Instance>();

  React.useLayoutEffect(() => {
    instanceRef.current?.destroy();
    if (referenceRef.current && popperRef.current) {
      instanceRef.current = createPopper(
        referenceRef.current,
        popperRef.current,
        {
          ...options,
          modifiers: [
            ...(hasArrow
              ? [
                  {
                    name: "arrow",
                    options: {
                      padding: 8,
                    },
                  },
                  { name: "offset", options: { offset: [0, 8] } },
                ]
              : []),
            ...(options.modifiers || []),
          ],
        }
      );
    }
    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = undefined;
    };
  }, deps);

  // React.useLayoutEffect(() => {
  //   instanceRef.current?.setOptions(mergedOptions);
  //   instanceRef.current?.update();
  // }, [mergedOptions]);

  return {
    reference: referenceRef,
    popper: popperRef,
    instanceRef,
    arrow: arrowRef,
  } as const;
};
