import React from "react";

export const useMounted = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
