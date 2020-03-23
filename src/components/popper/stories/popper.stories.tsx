import React from "react";
import { Popper } from "../popper";
import { Button } from "../../button";
import times from "lodash/times";
import { boolean } from "@storybook/addon-knobs";

export default {
  title: "Popper",
  component: Popper,
};

export const BasicUsage = () => {
  const content = (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper content
    </div>
  );
  return times(10, o => {
    return (
      <Popper content={content} key={o} placement="right">
        <Button style={{ marginBottom: "16px" }}>Popper Button</Button>
      </Popper>
    );
  });
};

export const PlacementUsage = () => {
  const content = (
    <div
      style={{
        padding: "16px 24px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper
    </div>
  );
  return (
    <div style={{ padding: "64px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "16px",
        }}
      >
        <Popper content={content} placement="topLeft" offset={8}>
          <Button style={{ marginRight: "16px" }}>top left</Button>
        </Popper>
        <Popper content={content} placement="top" offset={8}>
          <Button style={{ marginRight: "16px" }}>top center</Button>
        </Popper>
        <Popper content={content} placement="topRight" offset={8}>
          <Button>top right</Button>
        </Popper>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{}}>
          <Popper content={content} placement="leftTop" offset={8}>
            <Button style={{ marginBottom: "16px" }}>left top</Button>
          </Popper>
          <Popper content={content} placement="left" offset={8}>
            <Button style={{ marginBottom: "16px" }}>left center</Button>
          </Popper>
          <Popper content={content} placement="leftBottom" offset={8}>
            <Button>left bottom</Button>
          </Popper>
        </div>
        <div style={{}}>
          <Popper content={content} placement="rightTop" offset={8}>
            <Button style={{ marginBottom: "16px" }}>right top</Button>
          </Popper>
          <Popper content={content} placement="right" offset={8}>
            <Button style={{ marginBottom: "16px" }}>right center</Button>
          </Popper>
          <Popper content={content} placement="rightBottom" offset={8}>
            <Button>right bottom</Button>
          </Popper>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16px",
        }}
      >
        <Popper content={content} placement="bottomLeft" offset={8}>
          <Button style={{ marginRight: "16px" }}>bottom left</Button>
        </Popper>
        <Popper content={content} placement="bottom" offset={8}>
          <Button style={{ marginRight: "16px" }}>bottom center</Button>
        </Popper>
        <Popper content={content} placement="bottomRight" offset={8}>
          <Button>bottom right</Button>
        </Popper>
      </div>
    </div>
  );
};

export const TriggerUsage = () => {
  const content = (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper content
    </div>
  );
  return (
    <div style={{ padding: "64px" }}>
      <Popper content={content} placement="bottom" trigger="click">
        <Button style={{ marginBottom: "16px" }}>click trigger</Button>
      </Popper>
      <Popper content={content} placement="bottom" trigger="hover">
        <Button>hover trigger</Button>
      </Popper>
      {times(100, o => {
        return <div key={o}>{o}</div>;
      })}
    </div>
  );
};

export const Delay = () => {
  return (
    <div>
      <Popper content={<div>delay content</div>} placement="bottom" delay={500}>
        <Button style={{ marginBottom: "16px" }}>delay number</Button>
      </Popper>
      <Popper
        content={<div>delay content</div>}
        placement="bottom"
        delay={{ show: 500, hide: 100 }}
      >
        <Button style={{ marginBottom: "16px" }}>delay object</Button>
      </Popper>
    </div>
  );
};

export const Disabled = () => {
  const isDisabled = boolean("disabled", false);
  return (
    <Popper
      content={<div>delay content</div>}
      placement="bottom"
      disabled={isDisabled}
    >
      <Button style={{ marginBottom: "16px" }}>{`popper${
        isDisabled ? " disabled" : ""
      }`}</Button>
    </Popper>
  );
};
