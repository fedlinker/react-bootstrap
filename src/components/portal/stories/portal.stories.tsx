import React from "react";
import { Portal } from "../portal";

export default {
  title: "Portal",
};

export const BasicUsage = () => {
  return (
    <Portal>
      <div>I'm inner content in portal.</div>
    </Portal>
  );
};
