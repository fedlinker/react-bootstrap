import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Alert, AlertLink, IAlertTypeKey } from "./index";
import { ISizeType } from "src/components/enum/size";

export default {
  title: "Alert",
  component: Alert,
};

const types: IAlertTypeKey[] = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
  "light",
  "dark",
];

export const BasicUsage = () => {
  return types.map(type => (
    <Alert key={type} type={type}>
      A simple {type} alert—check it out!
    </Alert>
  ));
};

export const LinkColor = () => {
  return types.map(type => (
    <Alert key={type} type={type}>
      A simple {type} alert with <AlertLink>an example link</AlertLink>. Give it
      a click if you like.
    </Alert>
  ));
};

export const Dismissing = () => (
  <Alert type={"warning"} dismissible>
    <strong>Holy guacamole!</strong> You should check in on some of those fields
    below.
  </Alert>
);
