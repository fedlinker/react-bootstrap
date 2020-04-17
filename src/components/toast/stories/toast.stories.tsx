import React, { useState } from "react";
import { Toast, ToastMethod } from "../index";
import { SolidBell } from "@fedlinker/font-awesome";
import { Button } from "../../button";
// import { Button } from "../../button";

export default {
  title: "Toast",
  component: Toast,
};

export const ToastBaseUsage = () => {
  return (
    <Toast title={"Bootstrap"}>Hello, world! This is a toast message.</Toast>
  );
};

export const ToastWithIcon = () => {
  return (
    <Toast
      title={"Bootstrap"}
      icon={<SolidBell style={{ color: "rgb(0, 122, 255)" }} />}
    >
      Hello, world! This is a toast message.
    </Toast>
  );
};

const toastMethod = new ToastMethod({});
export const ToastByFuntion = () => {
  let count = 1;
  return (
    <Button
      type="primary"
      onClick={() => {
        toastMethod.toast({
          title: "Bootstrap",
          body: `${count}: Hello, world! This is a toast message.`,
        });
        count++;
      }}
    >
      click to toast
    </Button>
  );
};
