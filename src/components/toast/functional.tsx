/** @jsx jsx */
import React from "react";
import ReactDOM from "react-dom";
import { jsx } from "../theme";
import { IToastProps } from "./toast";
import { Toast } from "./toast";

export const ToastMethod = (props: IToastProps) => {
  const divDom = document.createElement("div");
  document.body.appendChild(divDom);
  ReactDOM.render(<Toast {...props} />, divDom);
};
