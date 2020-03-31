import React from "react";
import { Popover } from "../popover";
import { Button } from "../../button";
import times from "lodash/times";

export default {
  title: "Popover",
};

export const BasicUsage = () => {
  return (
    <div style={{ textAlign: "right" }}>
      <Popover
        title="title"
        content={
          <div>And here's some amazing content. It's very engaging. Right?</div>
        }
        placement="bottom"
      >
        <Button type="primary">Popover</Button>
      </Popover>
    </div>
  );
};

export const Placement = () => {
  const content = "content content";
  const title = "popover title";
  return (
    <div style={{ padding: "120px" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Popover title={title} content={content} placement="top-start">
            <Button style={{ marginRight: "16px" }}>top left</Button>
          </Popover>
          <Popover title={title} content={content} placement="top">
            <Button style={{ marginRight: "16px" }}>top center</Button>
          </Popover>
          <Popover title={title} content={content} placement="top-end">
            <Button>top right</Button>
          </Popover>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Popover title={title} content={content} placement="left-start">
              <Button style={{ marginBottom: "16px" }}>left top</Button>
            </Popover>
            <Popover title={title} content={content} placement="left">
              <Button style={{ marginBottom: "16px" }}>left center</Button>
            </Popover>
            <Popover content={content} placement="left-end">
              <Button>left bottom</Button>
            </Popover>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Popover title={title} content={content} placement="right-start">
              <Button style={{ marginBottom: "16px" }}>right top</Button>
            </Popover>
            <Popover title={title} content={content} placement="right">
              <Button style={{ marginBottom: "16px" }}>right center</Button>
            </Popover>
            <Popover title={title} content={content} placement="right-end">
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
          <Popover title={title} content={content} placement="bottom-start">
            <Button style={{ marginRight: "16px" }}>bottom left</Button>
          </Popover>
          <Popover title={title} content={content} placement="bottom">
            <Button style={{ marginRight: "16px" }}>bottom center</Button>
          </Popover>
          <Popover title={title} content={content} placement="bottom-end">
            <Button>bottom right</Button>
          </Popover>
        </div>
      </div>
    </div>
  );
};
