import React from "react";
import { Spinner } from "../spinner";
import { ISizeType, IThemeType } from "../../enum";
import { Row, Col, Container } from "../../layout";

export default {
  title: "Spinners",
  component: Spinner,
};

export function BasicUsage() {
  return (
    <div>
      <div>
        <Spinner />
      </div>
      <div>
        <Spinner type="grow" />
      </div>
    </div>
  );
}

export function Size() {
  const sizes: ISizeType[] = ["default", "lg", "sm"];
  return (
    <div>
      <div>
        {sizes.map((o) => {
          return <Spinner size={o} key={o} />;
        })}
      </div>
      <div>
        {sizes.map((o) => {
          return <Spinner size={o} key={o} type="grow" />;
        })}
      </div>
    </div>
  );
}

export function TextAlignCenter() {
  return (
    <div style={{ textAlign: "center" }}>
      <Spinner />
    </div>
  );
}

export function ThemeColor() {
  const themes: IThemeType[] = [
    "primary",
    "warning",
    "success",
    "light",
    "info",
    "dark",
    "danger",
  ];

  return (
    <div>
      <div>
        {themes.map((o) => {
          return <Spinner theme={o} key={o} />;
        })}
      </div>
      <div>
        {themes.map((o) => {
          return <Spinner theme={o} key={o} type="grow" />;
        })}
      </div>
    </div>
  );
}

export function FlexLayout() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>Loading...</div>
        <div>
          <Spinner theme="primary" />
        </div>
      </div>
    </div>
  );
}
