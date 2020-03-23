import React from "react";
import { Popover } from "../popover";
import { Button } from "../../button";

export default {
  title: "Popover",
};

export const BasicUsage = () => {
  return (
    <div>
      <Popover
        title="title"
        content={
          <div>And here's some amazing content. It's very engaging. Right?</div>
        }
        placement="top"
      >
        <Button type="primary">Popover</Button>
      </Popover>
    </div>
  );
};

export const Placement = () => {
  const content = "content content content content";
  const title = "popover title";
  return (
    <div style={{ padding: "64px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "16px",
        }}
      >
        <Popover title={title} content={content} placement="topLeft">
          <Button style={{ marginRight: "16px" }}>top left</Button>
        </Popover>
        <Popover title={title} content={content} placement="top">
          <Button style={{ marginRight: "16px" }}>top center</Button>
        </Popover>
        <Popover title={title} content={content} placement="topRight">
          <Button>top right</Button>
        </Popover>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{}}>
          <Popover title={title} content={content} placement="leftTop">
            <Button style={{ marginBottom: "16px" }}>left top</Button>
          </Popover>
          <Popover title={title} content={content} placement="left">
            <Button style={{ marginBottom: "16px" }}>left center</Button>
          </Popover>
          <Popover content={content} placement="leftBottom">
            <Button>left bottom</Button>
          </Popover>
        </div>
        <div style={{}}>
          <Popover title={title} content={content} placement="rightTop">
            <Button style={{ marginBottom: "16px" }}>right top</Button>
          </Popover>
          <Popover title={title} content={content} placement="right">
            <Button style={{ marginBottom: "16px" }}>right center</Button>
          </Popover>
          <Popover title={title} content={content} placement="rightBottom">
            <Button>right bottom</Button>
          </Popover>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16px",
        }}
      >
        <Popover title={title} content={content} placement="bottomLeft">
          <Button style={{ marginRight: "16px" }}>bottom left</Button>
        </Popover>
        <Popover title={title} content={content} placement="bottom">
          <Button style={{ marginRight: "16px" }}>bottom center</Button>
        </Popover>
        <Popover title={title} content={content} placement="bottomRight">
          <Button>bottom right</Button>
        </Popover>
      </div>
    </div>
  );
};
