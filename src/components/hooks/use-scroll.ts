import React from "react";

export interface IScrollHookState {
  x: number;
  y: number;
}

export const useScroll = (
  ref?: React.RefObject<HTMLElement>,
  options: { disabled?: boolean; interval?: number } = { disabled: false }
): IScrollHookState => {
  const [pos, setPos] = React.useState<IScrollHookState>({ x: 0, y: 0 });
  const { disabled = false, interval = 17 } = options;
  const timestamp = React.useRef<number>(0);
  const timer = React.useRef<undefined | NodeJS.Timeout>(undefined);

  React.useEffect(() => {
    if (disabled) {
      return;
    }
    const el = ref?.current || window.document;
    const calculatePos = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        return { x: e.target.scrollLeft, y: e.target.scrollTop };
      } else {
        return { x: window.scrollX, y: window.scrollY };
      }
    };
    const handleScroll = (e: Event) => {
      // setPos(calculatePos(e));
      if (e.timeStamp - timestamp.current <= interval) {
        return;
      }
      timestamp.current = e.timeStamp;
      setPos(calculatePos(e));
      timer.current && clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const p = calculatePos(e);
        if (pos.x !== p.x && pos.y !== p.y) {
          setPos(p);
        }
        timer.current = undefined;
      }, interval);
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [ref?.current, disabled]);

  return pos;
};
