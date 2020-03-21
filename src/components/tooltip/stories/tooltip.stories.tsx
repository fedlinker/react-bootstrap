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
  const content = "content";
  return (
    <div style={{ padding: "64px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "16px",
        }}
      >
        <Tooltip content={content} placement="topLeft">
          <Button style={{ marginRight: "16px" }}>top left</Button>
        </Tooltip>
        <Tooltip content={content} placement="top">
          <Button style={{ marginRight: "16px" }}>top center</Button>
        </Tooltip>
        <Tooltip content={content} placement="topRight">
          <Button>top right</Button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{}}>
          <Tooltip content={content} placement="leftTop">
            <Button style={{ marginBottom: "16px" }}>left top</Button>
          </Tooltip>
          <Tooltip content={content} placement="left">
            <Button style={{ marginBottom: "16px" }}>left center</Button>
          </Tooltip>
          <Tooltip content={content} placement="leftBottom">
            <Button>left bottom</Button>
          </Tooltip>
        </div>
        <div style={{}}>
          <Tooltip content={content} placement="rightTop">
            <Button style={{ marginBottom: "16px" }}>right top</Button>
          </Tooltip>
          <Tooltip content={content} placement="right">
            <Button style={{ marginBottom: "16px" }}>right center</Button>
          </Tooltip>
          <Tooltip content={content} placement="rightBottom">
            <Button>right bottom</Button>
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
        <Tooltip content={content} placement="bottomLeft">
          <Button style={{ marginRight: "16px" }}>bottom left</Button>
        </Tooltip>
        <Tooltip content={content} placement="bottom">
          <Button style={{ marginRight: "16px" }}>bottom center</Button>
        </Tooltip>
        <Tooltip content={content} placement="bottomRight">
          <Button>bottom right</Button>
        </Tooltip>
      </div>
    </div>
  );
};
