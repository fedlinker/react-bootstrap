import React from "react";
import { Tooltip } from "../tooltip";
import { Button } from "../../button";

export default {
  title: "Tooltips",
};

export const BasicUsage = () => {
  return (
    <Tooltip content="content">
      <Button>tooltips</Button>
    </Tooltip>
  );
};

export const PlacementUsage = () => {
  const content = "co";
  return (
    <div style={{ width: "3000px", height: "3000px" }}>
      <div style={{ padding: "64px", width: "600px", height: "600px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "16px",
          }}
        >
          <Tooltip content={content} placement="top-start">
            <Button style={{ marginRight: "16px" }}>top-start</Button>
          </Tooltip>
          <Tooltip content={content} placement="top">
            <Button style={{ marginRight: "16px" }}>top</Button>
          </Tooltip>
          <Tooltip content={content} placement="top-end">
            <Button>top-end</Button>
          </Tooltip>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Tooltip content={content} placement="left-start">
              <Button style={{ marginBottom: "16px" }}>left-start</Button>
            </Tooltip>
            <Tooltip content={content} placement="left">
              <Button style={{ marginBottom: "16px" }}>left</Button>
            </Tooltip>
            <Tooltip content={content} placement="left-end" trigger="click">
              <Button>left-end</Button>
            </Tooltip>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Tooltip content={content} placement="right-start">
              <Button style={{ marginBottom: "16px" }}>right-start</Button>
            </Tooltip>
            <Tooltip content={content} placement="right">
              <Button style={{ marginBottom: "16px" }}>right</Button>
            </Tooltip>
            <Tooltip content={content} placement="right-end">
              <Button>right-end</Button>
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "16px",
          }}
        >
          <Tooltip content={content} placement="bottom-start" trigger="click">
            <Button style={{ marginRight: "16px" }}>bottom-start</Button>
          </Tooltip>
          <Tooltip content={content} placement="bottom">
            <Button style={{ marginRight: "16px" }}>bottom</Button>
          </Tooltip>
          <Tooltip content={content} placement="bottom-end">
            <Button>bottom-end</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
