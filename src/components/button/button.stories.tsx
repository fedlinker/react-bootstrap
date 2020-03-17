import React from "react";
import { Button, IButtonTypeKey } from "./index";
import { BrandsGithub } from "@fedlinker/font-awesome";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { ISizeType } from "../enum/size";

export default { title: "Button", component: Button };

const types: IButtonTypeKey[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "light",
  "dark",
];

export const buttonType = () => {
  const margin = "12px";

  return types.map(t => {
    return (
      <Button type={t} key={t} style={{ margin }} onClick={action(t)}>
        {t.toUpperCase()}
      </Button>
    );
  });
};

export const linkButton = () => {
  return (
    <div>
      <Button type="primary" link href="https://google.com" target="_blank">
        Link to google
      </Button>
      <Button type="danger" link href="https://google.com" target="_blank">
        Link to google
      </Button>
    </div>
  );
};

export const buttonSize = () => {
  var margin = "12px";
  const sizes: Array<ISizeType> = ["default", "lg", "sm"];
  return sizes.map((size, index) => {
    return (
      <Button size={size} key={index} type="primary" style={{ margin }}>
        {`size-${size || "default"}`}
      </Button>
    );
  });
};

export const outlineButtons = () => {
  const margin = "12px";
  return types.map(t => {
    return (
      <Button type={t} key={t} style={{ margin }} outline>
        {t.toUpperCase()}
      </Button>
    );
  });
};

export const disabledState = () => {
  const margin = "12px";
  return (
    <div>
      <div>
        {types.map(t => {
          return (
            <Button
              type={t}
              key={t}
              style={{ margin }}
              disabled={boolean("disabled", true)}
            >
              {t.toUpperCase()}
            </Button>
          );
        })}
      </div>
      <div>
        {types.map(t => {
          return (
            <Button type={t} key={t} style={{ margin }} disabled outline>
              {t.toUpperCase()}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export const blockState = () => {
  const marginTop = "12px";
  const margin = "12px";
  return (
    <div>
      <div>
        {types.map(t => {
          return (
            <Button type={t} key={t} style={{ margin }}>
              {t.toUpperCase()}
            </Button>
          );
        })}
      </div>
      <div>
        {types.map(t => {
          return (
            <Button type={t} key={t} style={{ marginTop }} block>
              {t.toUpperCase()}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export const loadingState = () => {
  const loading = boolean("loading", true);
  var margin = "12px";
  return (
    <div>
      <div>Button status: {loading ? "Loading" : "Not loading"} </div>
      <div>
        {types.map(t => {
          return (
            <Button type={t} key={t} style={{ margin }} loading={loading}>
              {t.toUpperCase()}
            </Button>
          );
        })}
      </div>
      <div>
        {types.map(t => {
          return (
            <Button
              type={t}
              key={t}
              style={{ margin }}
              loading={loading}
              outline
            >
              {`${t.toUpperCase()} Outline`}
            </Button>
          );
        })}
      </div>
      <Button block loading={loading} type="primary">
        Primary Block Button
      </Button>
      <div>--</div>
      <Button block loading={loading} type="info" outline>
        Info Block Outline Button
      </Button>
    </div>
  );
};

export const addIcon = () => {
  const style = {
    marginBottom: "8px",
  };
  return (
    <div>
      <div style={style}>
        <Button type="primary">
          <BrandsGithub /> Icon before
        </Button>
      </div>
      <div style={style}>
        <Button type="success">
          Icon after <BrandsGithub />
        </Button>
      </div>
      <div style={style}>
        <Button type="warning" block>
          <BrandsGithub /> Icon block
        </Button>
      </div>
    </div>
  );
};

export const customButton = () => {
  const custom1 = {
    backgroundImage: "linear-gradient(30deg, #007bff, #28a745)",
    color: "#fff",
  };
  return (
    <div>
      <div>
        <Button style={custom1} type="primary">
          Customize background color
        </Button>
      </div>
      <div>---</div>
      <div>
        <Button style={custom1} disabled>
          Customize background color
        </Button>
      </div>
      <div>---</div>
      <div>
        <Button style={custom1} loading>
          Customize background color
        </Button>
      </div>
    </div>
  );
};
