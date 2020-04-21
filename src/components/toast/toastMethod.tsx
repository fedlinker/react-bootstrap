/** @jsx jsx */
import React, { useRef, ReactElement } from "react";
import ReactDOM from "react-dom";
import { jsx } from "../theme";
import { IToastProps } from "./toast";
import { Toast } from "./toast";

interface IToastMethodProps extends IToastProps {
  maxCoexist?: number;
}

export const ToastRender = (props: IToastMethodProps) => {
  const divDom = document.createElement("div");
  document.body.appendChild(divDom);
  ReactDOM.render(<Toast {...props} />, divDom);
  // return childRef
  return divDom;
};

export class ToastMethod {
  messageQueue: HTMLElement[] = [];
  maxCoexist: number;
  constructor({ maxCoexist = 3 }: IToastMethodProps) {
    this.maxCoexist = maxCoexist;
  }
  toast = (props: IToastMethodProps) => {
    if (this.messageQueue.length >= this.maxCoexist) {
      const ExpiredDom = this.messageQueue.shift();
      ExpiredDom && ExpiredDom.remove();
    }
    const toastResult = ToastRender(props);
    this.messageQueue.push(toastResult);
    return toastResult;
  };
}
